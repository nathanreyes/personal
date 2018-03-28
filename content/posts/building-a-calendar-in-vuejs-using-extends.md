Welcome to Part 2 of this series on building an extendable calendar in Vue.js. I’m very excited to share a technique commonly used to functionally extend Vue.js components. If you come from the legacy desktop world as I do, you may have had some trouble when trying to re-implement some of the older techniques you’re more accustomed to when trying to reuse user interface components. I mean, is there subclassing in Vue?…would that be overkill…or should you just create a parent component that wraps your original one and reimplements all of the UI?…what to do, what to do?

The good news is that Vue.js has our back in more ways than one, and in this tutorial we’ll explore one of the features it provides to add some of that flexibility we want. To do that, we’ll look at implementing a useful feature for our calendar component: date selection.

### Component extension, the not so scalable way…

We would like to support 3 different modes of date selection:

1. Single date
2. Multiple dates
3. Date ranges

First, let’s take the natural progression for implementing this sort of feature. We can deconstruct the logic into 3 distinct sets of operational requirements:

1. Specify for the component which selection mode we would like to use as well as the current selection value we would like for it to display, all while supporting the [v-model syntax](https://vuejs.org/v2/guide/components-custom-events.html#Binding-Native-Events-to-Components). Specifically, accept a `value` prop and emit an input event when value needs to be updated.
2. Identify if a given day of the month falls within the `value` selection. This function must get called for every day displayed in the calendar.
3. As the user interacts with the calendar, such as when selecting, deselecting, or dragging across day cells, the component should notify the parent component that the selection has been updated.

To execute on this plan, we can then see what a skeleton of our refactored component might start to look like.

```javascript
// We can represent selection values as the following
//  single: date object
//  multiple: array of dates
//  range: object that contains a start and end date
props: {
  value: { type: null }, 
  selectMode: { type: String },
},
computed: {
  ...
  ...custom properties needed to support single selection mode
  ...custom properties needed to support multiple selection mode
  ...custom properties needed to support range selection mode
  ...
  weeks() {
    for each week of the month {
      for each day of the week {
        // Now adding a new 'isSelected' field for each day info object
        day.isSelected = this.dayIsSelected(day);
      }
    }    
  }
},
methods: {
  dayIsSelected(day) {
    switch (selectMode) {
      case 'single':
        ...return (day date object is equal to the value date)
      case 'multiple':
        ...return (day date included in the value array)
      case 'range':
        ...return (day date is within range of value start and value end dates)
    }
  },
  // Called from UI when day cell is clicked
  let newSelection;
  selectDay(day) {
    switch (selectMode) {
      case 'single':
        // Logic to recalculate new selection
        newSelection = ...;
      case 'multiple':
        // Logic to recalculate new selection
        newSelection = ...;
      case 'range':
        // Logic to recalculate new selection
        newSelection = ...;
    }
    // Emit event to notify listeners (parent) of new selection
    // Note: we don't assign the selection directly to our value
    this.$emit('input', newSelection);
  }
  // Called from UI when day cell is dragged over, but only needed for range mode
  enterDay(day) {
    if (selectMode === 'range' && value.isDragging) {
      // Logic to recalculate new selection
    }
  }
},
```

With this skeleton we have met the operational requirements, but there is some code smell here. Sure, it gets the job done, but there are some flaws with this approach.

1. We are over-extending the singular *job to be done* by our calendar. It currently provides a layout structure for header, weekday, and day cells with associated state information for a given month and year. It serves that purpose well. Now we’ve tasked it with managing date selection state.
2. The logic to support any particular selection mode is scattered throughout the component. Just look at all of those switch statements at every step of the process. Also, that `enterDay(day)` method is only needed for the range selection mode. And we’ll probably need some custom computed properties for each mode as well. In short, the goal is to have one place we can go to see all the logic for implementing a particular selection mode feature. This design falls short of that goal.
3. This approach is not scalable. Let’s say we would like to implement another custom selection mode in the future. Or maybe we would like to use this component as an event calendar instead of a simple date picker. That would mean a lot more specialized code scattered throughout our component, muddying it up even more.

So to restate the problem, what we need is a way to functionally extend our calendar component in multiple ways (`"single"` date, `"multiple"` date and date `"range"` selection), each implemented in an abstract and centralized manner that don’t intrude upon the component implementation itself. Sounds like a daunting task.

#### Getting the bigger picture

First, we should acknowledge that what we are trying to do with our calendar component essentially changes its core function. It is a calendar and we would like to keep it that way. We are now transforming it into different kinds of date pickers. Making this subtle but important distinction could save us heartache in the future when we decide to use it to display events, for example. Let’s use a diagram to help us get a bigger picture for what exactly we are trying to accomplish.

<img class='block mx-auto md:w-3/4 mb-6' src='/images/building-a-calendar-in-vuejs-using-extends/cover.png'>

### Using the ‘extends’ option

Vue supports the ability to easily inherit functionality from other components by ‘extending’ them. This means we can define custom components, each with their own options (lifecycle hooks, props, data, computed properties, methods, etc) that are essentially merged with the options from the original component. The great thing to keep in mind here is that we get the same *reactivity* with the extended options as if they were part of the original component itself.

If you know much about Vue, extending components might sound very similar to *mixins*. And honestly, they do much of the same thing, albiet in a different way. The best advice I can give (and others should feel free to comment on this) is that mixins in general shouldn’t be aware of the context in which they are used, whereas extending is more in line with traditional subclassing. I’ll refer you to Vue’s own [documentation](https://vuejs.org/v2/guide/mixins.html) to get a better idea of when mixins might be a better option for your situation. For our calendar, we’ll go with component extension as our date pickers do assume that they are used within the context of our calendar component.

Let’s start with our first extended component, the `single-date-picker`.

```javascript
Vue.component('single-date-picker', {
  created() {
    this.$on('configureDay', this.configureDay);
    this.$on('selectDay', this.selectDay);
  },
  extends: calendar,
  props: {
    value: Date,
  },
  computed: {
    hasValue() {
      return this.value && typeof this.value.getTime === 'function';
    },
    valueTime() {
      return this.hasValue ? this.value.getTime() : null;
    },
  },
  methods: {
    configureDay(day) {
      day.isSelected = day.date.getTime() === this.valueTime;
    },
    selectDay(day) {
      this.$emit('input', day.isSelected ? null : day.date);
    }
  },
});
```

Some items to note:

1. By abstracting out the logic into a separate component, our original calendar component is allowed to focus on what it does best.
2. We now have a centralized object we can refer to in order to see how single date selection is implemented. This will be a great benefit for yourself or others when this feature is debugged or modified later.
3. That `extends` option is what flags Vue to do the extension magic.
4. The `selectDay(day)` methods emit an input event rather than assigning the value itself, keeping it in-line with the unidirectional data flow.
Let’s discuss those the event handlers in the `created()` lifecycle method.

In this example, we are using events to provide an interface between our base calendar component and any extending components. While we could directly call some generically defined methods from within our calendar component and require that our extending components override them, this approach introduces some subtle limitations that are not completely obvious at first. Simply put, it tightly couples the base component with extending components in various ways. Additionally, we would like to provide the ability for parent components that consume our calendar/picker components to hook into some of this functionality as well.

*Events* can serve as a loosely coupled mechanism by which our base component can interface with its extending and parent components at the same time. For example, the `configureDay(day)` event supports other components’ abilities to append state data needed for their own feature.

So hopefully that goes a little ways on explaining the benefits that extending components provides. My advice is to give it a try and see for yourself.

Let’s move on to the `multiple-date-picker` component.

```javascript
Vue.component('multiple-date-picker', {
  created() {
    this.$on('configureDay', this.configureDay);
    this.$on('selectDay', this.selectDay);
  },
  extends: calendar,
  props: {
    value: { type: Array, default: []},
  },
  computed: {
    hasValues() {
      return Array.isArray(this.value) && this.value.length > 0;
    },
    valueTimes() {
      if (!this.hasValues) return [];
      return this.value.map(v => v.getTime());
    },
  },
  methods: {
    configureDay(day) {
      day.isSelected = this.dayIsSelected(day);
    },
    dayIsSelected(day) {
      if (!this.hasValues) return false;
      const t = day.date.getTime();
      return !!this.valueTimes.find(vt => vt === t);
    },
    selectDay(day) {
      if (!day.isSelected) {
        this.$emit('input', this.hasValues ? [...this.value, day.date] : [day.date]);
      } else {
        this.$emit('input', this.value.filter(v => v.getTime() !== day.date.getTime()));
      }
    },
  },
});
```

And finally the `date-range-picker` component.

```javascript
Vue.component('date-range-picker', {
  created() {
    this.$on('configureDay', this.configureDay);
    this.$on('selectDay', this.selectDay);
    this.$on('enterDay', this.enterDay);
  },
  extends: calendar,
  data() {
    return {
      valueIsValid: false,
      dragRange: null,
    };
  },
  props: {
    value: { type: Object, default: { } },
  },
  computed: {
    valueIsValid() {
      return this.value && this.value.start && this.value.end;
    },
    normalizedValue() {
      return this.normalizeRange(this.value);
    },
    normalizedDragRange() {
      return this.normalizeRange(this.dragRange);
    },
  },
  watch: {
    normalizedDragRange(val) {
      // Any time drag changes, normalize it and emit 'drag' event
      this.$emit('drag', val ? { start: val.start, end: val.end } : null);
    },
  },
  methods: {
    configureDay(day) {
      const dateTime = day.date.getTime();
      const valueRange = this.normalizedValue;
      const dragRange = this.normalizedDragRange;
      day.isSelected = valueRange && dateTime >= valueRange.startTime && dateTime <= valueRange.endTime;
      day.startsSelection = valueRange && dateTime === valueRange.startTime;
      day.endsSelection = valueRange && dateTime === valueRange.endTime;
      day.dragActive = dragRange; // Just to let day know drag is happening somewhere
      day.isDragged = dragRange && dateTime >= dragRange.startTime && dateTime <= dragRange.endTime;
      day.startsDrag = dragRange && dateTime === dragRange.startTime;
      day.endsDrag = dragRange && dateTime === dragRange.endTime;
    },
    selectDay(day) {
      // Start new drag selection if not dragging
      if (!this.dragRange) {
        this.dragRange = {
          start: day.date,
          end: day.date,
        };
      // Complete drag selection
      } else {
        const { start, end } = this.normalizedDragRange;
        // Clear drag selection
        this.dragRange = null;
        // Signal new value selected on drag complete
        this.$emit('input', { start, end });
      }
    },
    enterDay(day) {
      if (!this.dragRange) return;
      // Update drag selection
      this.dragRange = {
        start: this.dragRange.start,
        end: day.date,
      };
    },
    // Ranges can privately have end date earlier than start date
    // This function will correct the order before exposing it to to other components
    normalizeRange(range) {
      if (!range) return null;
      const { start, end } = range;
      const startTime = start.getTime();
      const endTime = end.getTime();
      const isNormal = start < end;
      return {
        start: isNormal ? start : end,
        startTime : isNormal ? startTime : endTime,
        end: isNormal ? end : start,
        endTime: isNormal ? endTime : startTime,
      };
    }
  },
});
```

The only real difference with the range picker component is that we listen for the `enterDay(day)` event, which gets raised when the user’s mouse cursor enters (as it moves over) a day cell. It is reasonable for the calendar component to raise this event, as you could imagine other components being able to utilize this event as well?

Finally, let’s not forget to honor the base calendar component’s side of the contract by raising those events. Reference line 45 for changes to the `weeks` computed property.

```javascript
computed: {
  ...,
  weeks() {
    const weeks = [];
    let previousMonth = true, thisMonth = false, nextMonth = false;
    let day = this.previousMonthComps.days - this.firstWeekdayInMonth + 2;
    let month = this.previousMonthComps.month;
    let year = this.previousMonthComps.year;
    // Cycle through each week of the month, up to 6 total
    for (let w = 1; w <= 6 && !nextMonth; w++) {
      // Cycle through each weekday
      const week = [];
      for (let d = 1; d <= 7; d++) {

        // We need to know when to start counting actual month days
        if (previousMonth && d >= this.firstWeekdayInMonth) {
          // Reset day/month/year counters
          day = 1;
          month = this.month;
          year = this.year;
          // ...and flag we're tracking actual month days
          previousMonth = false;
          thisMonth = true;
        }

        // Append day info for the current week
        // Note: this might or might not be an actual month day
        //  We don't know how the UI wants to display various days,
        //  so we'll supply all the data we can
        const dayInfo = {
          label: (day && thisMonth) ? day.toString() : '',
          day,
          weekday: d,
          week: w,
          month,
          year,
          date: new Date(year, month - 1, day),
          beforeMonth: previousMonth,
          afterMonth: nextMonth,
          inMonth: thisMonth,
          isToday: day === _todayComps.day && month === _todayComps.month && year === _todayComps.year,
          isFirstDay: thisMonth && day === 1,
          isLastDay: thisMonth && day === this.daysInMonth,
        };
        this.$emit('configureDay', dayInfo); // <=== THIS IS THE NEW EVENT WE RAISE NOW
        week.push(dayInfo);

        // We've hit the last day of the month
        if (thisMonth && day >= this.daysInMonth) {
          thisMonth = false;
          nextMonth = true;
          day = 1;
          month = this.nextMonthComps.month;
          year = this.nextMonthComps.year;
        // Still in the middle of the month (hasn't ended yet)
        } else {
          day++;
        }
      }
      // Append week info for the month
      weeks.push(week);
    }
    return weeks;
  }
}
```

We can emit the remaining events directly from the template (lines 24–26).

```html
<div class='calendar'>
  <div class='header'>
    <a class='arrow' @click='movePreviousYear'>&laquo;</a>
    <a class='arrow' @click='movePreviousMonth'>&lsaquo;</a>
    <span class='title' @click='moveThisMonth'>
      {{ header.label }}
    </span>
    <a class='arrow' @click='moveNextMonth'>&rsaquo;</a>
    <a class='arrow' @click='moveNextYear'>&raquo;</a>
  </div>
  <div class='weekdays'>
    <div class="weekday" v-for='weekday in weekdays'>
      {{ weekday.label_3 }}
    </div>
  </div>
  <div class='week' v-for='week in weeks'>
    <div
      class='day'
      :class='{ today: day.isToday, "not-in-month": !day.inMonth, "selected": day.isSelected }'
      v-for='day in week'
      @click='$emit("selectDay", day)'
      @mouseenter='$emit("enterDay", day)'
      @mouseleave='$emit("leaveDay", day)'>
      {{ day[dayKey] }}
    </div>
  </div>
</div>
```

### Conclusion

At this point, we have successfully extended our calendar into multiple date picker controls, whilst taking care to be as minimally invasive of our base calendar as possible.

I highly recommend extending your components as much as reasonably possible. If, throughout this tutorial, you were left wishing that you could just combine the three picker components into one, I would recommend that you reference the CodePen below. It uses a dynamic component to switch out the pickers on the fly, depending on which selection mode is specified. I would recommend combining them using this approach rather than embedding all of the logic together in a simple component, but obviously you are free to combine them however you would like.

In the next and final part of this series, we’ll move into extending our component visually so that we can easily apply our calendar and date pickers within different design contexts. See you then.