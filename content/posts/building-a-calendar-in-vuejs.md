<img class='block mx-auto md:w-3/4 mb-6' src='/images/building-a-calendar-in-vuejs/cover.png'>

In this series of tutorials, we’ll construct a lightweight, extendable calendar component in Vue.js. We’ll cover step by step how to implement the date logic as well as introduce some Vue specific features to support multiple interface designs. The date logic is surprisingly simple…probably more simple than you would initially think, and hopefully you will be introduced to some ideas on how to design components that are built for future reuse and extendability.

The requirements for this tutorial include the following:

1.  Vue.js!
2.  No dependencies (except Vue, of course).
3.  Single date, multiple date and date range selection modes.
4.  Extendable with sensible defaults. There are some great packages out there for calendars, but I haven’t seen one that I quite like that I could see myself using in a deverse set of design contexts. This goal specifically will take the most effort but it will strengthen our skills in designing extensible components using HTML, Javascript, and CSS.

This complete tutorial will be broken down into 3 parts:

1.  Design the state model that provides the foundation for an extendable calendar component, as well as providing a sensible default user interface with navigation controls.
2.  Support date selection modes.
3.  Refactor to support extendiblity of the UI, including component composition and prop functions.

---

### State Model

First, we can declare a few constant arrays outside the scope of the vue instance. Don’t worry about trying to completely understand their purpose yet as they will become apparent throughout this tutorial.

```javascript
// Calendar data
const _daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const _weekdayLabels = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const _weekdayLength = 3;
const _weekdayCasing = 'title';
const _monthLabels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const _monthLength = 0;
const _monthCasing = 'title';

// Helper function for label transformation
const _transformLabel = (label, length, casing) => {
  label = length <= 0 ? label : label.substring(0, length);
  if (casing.toLowerCase() === 'lower') return label.toLowerCase();
  if (casing.toLowerCase() === 'upper') return label.toUpperCase();
  return label;
};

// Today's data
const _today = new Date();
const _todayComps = {
  year: _today.getFullYear(),
  month: _today.getMonth() + 1,
  day: _today.getDate(),
};
```

Otherwise, the UI is completely derived from 2 data fields.

```javascript
new Vue({
  el: '#app',
  data: {
    month: _todayComps.month,
    year: _todayComps.year,
  },
  ...
});
```

> Note: If you are using the now re-introduced prop sync modifiers (v2.3.0+) you could convert month and year to props and keep them in sync with parent components via update events. For this example, however, we’ll focus on pre-2.3.0 versions of Vue.

From these data fields, we can then start deriving our computed properties.

```javascript
computed: {
  // Our component exposes month as 1-based, but sometimes we need 0-based
  monthIndex() {
    return this.month - 1;
  },
  // State referenced by header (no dependencies yet...)
  months() {
    return _monthLabels.map((ml, i) => ({
      label: _transformLabel(ml, _monthLength, _monthCasing),
      number: i + 1,
    }));
  },
  // State for weekday header (no dependencies yet...)
  weekdays() {
    return _weekdayLabels.map((wl, i) => {
      return {
        label: _transformLabel(wl, _weekdayLength, _weekdayCasing),
        number: i + 1,
      };
    });
  },
  // State for calendar header
  header() {
    const month = this.months[this.monthIndex];
    return {
      month,
      year: this.year.toString(),
      shortYear: this.year.toString().substring(2, 4),
      label: month.label + ' ' + this.year,
    };
  },
  // Returns number for first weekday (1-7), starting from Sunday
  firstWeekdayInMonth() {
    return new Date(this.year, this.monthIndex, 1).getDay() + 1;
  },
  // Returns number of days in the current month
  daysInMonth() {
    // Check for February in a leap year
    const isFebruary = this.month === 2;
    const isLeapYear = (this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0;
    if (isFebruary && isLeapYear) return 29;
    // ...Just a normal month
    return _daysInMonths[this.monthIndex];
  },
  ...
}
```

> Quick reminder if you are new to Vue: computed properties are defined as functions that are intelligently executed by Vue on-demand. Vue keeps track of the functions’ dependencies and only recalculates their associated properties when their dependencies change. The takeaway here is that there is no reason to worry about unnecessary recalculations at runtime.

Let’s touch on a couple of these computed fields.

* `firstWeekdayInMonth` Months start on different weekdays. However, since our calendar is going to start displaying day cells from Sunday for every month (even if it is not in the current month), we need this number to know when to start keeping track of the actual month days.
* `daysInMonth` Number of the days in the current month. Pretty self-explanatory. Note, though, that we use some additional logic to account for leap years.

The last computed field efficiently computes the state needed to display the calendar days.

```javascript
computed: {
  ...,
  weeks() {
    const weeks = [];
    let monthStarted = false, monthEnded = false;
    let monthDay = 0;
    // Cycle through each week of the month, up to 6 total
    for (let w = 1; w <= 6 && !monthEnded; w++) {
      // Cycle through each weekday
      const week = [];
      for (let d = 1; d <= 7; d++) {
        // We need to know when to start counting actual month days
        if (!monthStarted && d >= this.firstWeekdayInMonth) {
          // Initialize day counter
          monthDay = 1;
          // ...and flag we're tracking actual month days
          monthStarted = true;
        // Still in the middle of the month (hasn't ended yet)
        } else if (monthStarted && !monthEnded) {
          // Increment the day counter
          monthDay += 1;
        }
        // Append day info for the current week
        // Note: this might or might not be an actual month day
        //  We don't know how the UI wants to display various days,
        //  so we'll supply all the data we can
        week.push({
          label: monthDay ? monthDay.toString() : '',
          number: monthDay,
          weekdayNumber: d,
          weekNumber: w,
          beforeMonth: !monthStarted,
          afterMonth: monthEnded,
          inMonth: monthStarted && !monthEnded,
          isToday: monthDay === _todayComps.day && this.month === _todayComps.month && this.year === _todayComps.year,
          isFirstDay: monthDay === 1,
          isLastDay: monthDay === this.daysInMonth,
        });

        // Trigger end of month on the last day
        if (monthStarted && !monthEnded && monthDay >= this.daysInMonth) {
          monthDay = 0;
          monthEnded = true;
        }
      }
      // Append week info for the month
      weeks.push(week);
    }
    return weeks;
  },
  // End of computed properties
},
```

Take a moment to review the computed properties above to get a good feel for what we are trying to accomplish. Our user interface needs to display cells from the first day of the first week to the last day of the last week of the month. This includes cells for days that do not necessarily fall within the current month. In the end, all the state data for each day that could possibly be useful to our UI has been assigned.

And this is really the beauty of Vue.js, in that we can declaratively decide how our state model should appear to the view. The cognitive weight of tracking dependencies is lifted off of our shoulders and the process of how state gets intelligently updated is inherently simplified.

In this specific case, it’s not difficult to see that a change in the month or year should trigger a recalculation of the calendar data. But as more complex situations arise, Vue’s ability to abstract the synchronization of the view with its state starts to really pay off.

Before moving on the the interface, let’s implement some Vue helper methods that allow us to navigate forwards and backwards in single month and year increments. Because we’ve already done the hard work in declaring our state, this is easy-peasy.

```javascript
methods: {
  moveThisMonth() {
    this.month = _todayComps.month;
    this.year = _todayComps.year;
  },
  moveNextMonth() {
    if (this.month < 12) {
      this.month++;
    } else {
      this.month = 1;
      this.year++;
    }
  },
  movePreviousMonth() {
    if (this.month > 1) {
      this.month--;
    } else {
      this.month = 12;
      this.year--;
    }
  },
  moveNextYear() {
    this.year++;
  },
  movePreviousYear() {
    this.year--;
  },
},
```

Whew! We’re done with the state.

---

### Interface

Now we can start reaping the benefits of architecting a simple and comprehensive state model.
Let’s just take a moment to enjoy this declarative goodness.

```html
<div id='app'>
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
      <div class='weekday' v-for='weekday in weekdays'>
        {{ weekday.label }}
      </div>
    </div>
    <div class='week' v-for='week in weeks'>
      <div class='day' :class='{ today: day.isToday }' v-for='day in week'>
        {{ day.label }}
      </div>
    </div>
  </div>
</div>
```

Ok. Well…that was nice. Here’s the SCSS.

```scss
$themeColor: #ff7a58;

$headerPadding: 0.5rem 1rem;
$headerBorderWidth: 1px;
$headerBorderStyle: solid;
$headerBorderColor: #aaaaaa;
$headerBackground: $themeColor;
$headerColor: white;

$weekdayPadding: 0.4rem 0;
$weekdayColor: #7a7a7a;
$weekdayBorderWidth: 1px;
$weekdayBorderStyle: solid;
$weekdayBorderColor: #aaaaaa;
$weekdayBackground: #eaeaea;

$dayColor: #3a3a3a;
$dayBorder: solid 1px #aaaaaa;
$dayBackgroundColor: white;
$dayWidth: 14.2857%;
$dayHeight: 50px;

$todayColor: white;
$todayBackgroundColor: $themeColor;

$fontFamily: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  'Helvetica', 'Arial', sans-serif;

* {
  box-sizing: border-box;
}

#app {
  font-family: $fontFamily;
  padding: 20px;
}

.calendar {
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: stretch;
  align-items: center;
  color: $headerColor;
  padding: $headerPadding;
  border-width: $headerBorderWidth;
  border-style: $headerBorderStyle;
  border-color: $headerBorderColor;
  background-color: $headerBackground;

  @mixin pointer() {
    cursor: pointer;
    &:hover {
      color: #dcdcdc;
    }
  }

  .arrow {
    @include pointer;
    padding: 0 0.4em 0.2em 0.4em;
    font-size: 1.8rem;
    font-weight: 500;
    user-select: none;
    flex-grow: 0;
  }

  .title {
    @include pointer;
    flex-grow: 1;
    font-size: 1.2rem;
    text-align: center;
  }
}

.weekdays {
  display: flex;
  flex: auto;
}

.weekday {
  width: $dayWidth;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: $weekdayPadding;
  color: $weekdayColor;
  border-width: $weekdayBorderWidth;
  border-style: $weekdayBorderStyle;
  border-color: $weekdayBorderColor;
  background-color: $weekdayBackground;
}

.week {
  display: flex;
}

.day {
  width: $dayWidth;
  height: $dayHeight;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $dayColor;
  background-color: $dayBackgroundColor;
  border: $dayBorder;
}

.today {
  font-weight: 500;
  color: $todayColor;
  background-color: $todayBackgroundColor;
}
```

Feel free to modify to taste, but don’t get too far with customization.

In upcoming tutorials, we’ll add support for selecting single dates, multiple dates, and date ranges, as well refactor a bit to make this calendar extendable from a user interface perspective.
