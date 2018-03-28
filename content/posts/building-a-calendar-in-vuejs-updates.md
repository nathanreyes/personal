### Displaying days not in month

Before we continue to Part 2 of this series, upon reflecting on the code from Part 1, I realized there was a use-case not supported by the current state model. Many calendars like to display the day numbers for days that aren’t in the current month. Most of the time they are in a lighter colored font, but they are still there and some users may find that bit of context useful.

<img class='block mx-auto md:w-3/4 mb-6' src='https://res.cloudinary.com/dqgcfqzpk/image/upload/v1522240934/personal/posts/building-a-calendar-in-vuejs-updates/cover.png'>

To support this feature, we need to refactor our code a little bit. First, we’ll add three new computed properties to make life a little easier down the road.

* `isLeapYear`: Calculating the leap year is going to happen more often now, so we can use this computed property to cache it for us.

* `previousMonthComps` & `nextMonthComps`: We now need to know a little bit about the month immediately before and after the current month. This information is simple to calculate. Note that we are referencing our _daysInMonth constant array and the newly created isLeapYear computed property.

```javascript
computed: {
  ...,
  isLeapYear() {
    return (this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0;
  },
  // Data components for previous month
  previousMonthComps() {
    if (this.month === 1) return {
      days: _daysInMonths[11],
      month: 12,
      year: this.year - 1,
    }
    return {
      days: (this.month === 3 && this.isLeapYear) ? 29 : _daysInMonths[this.monthIndex - 1],
      month: this.month - 1,
      year: this.year,
    };
  },
  // Data components for next month
  nextMonthComps() {
    if (this.month === 12) return {
      days: _daysInMonths[0],
      month: 1,
      year: this.year + 1,
    };
    return {
      days: (this.month === 1 && this.isLeapYear) ? 29 : _daysInMonths[this.monthIndex + 1],
      month: this.month + 1,
      year: this.year,
    };
  },
  ...
}
```

With these new computed properties we can now simplify some of our previous code a bit:

```javascript
computed: {
  ...,
    
  /********** BEFORE **********/
  // Returns number of days in the current month
  daysInMonth() {
    // Check for February in a leap year
    const isFebruary = this.month === 2;
    const isLeapYear = (this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0;
    if (isFebruary && isLeapYear) return 29;
    // ...Just a normal month
    return _daysInMonths[this.monthIndex];
  },
    
  /********** AFTER **********/
  // Returns number of days in the current month
  daysInMonth() {
    // Check for February in a leap year
    if (this.month === 2 && this.isLeapYear) return 29;
    // ...Just a normal month
    return _daysInMonths[this.monthIndex];
  },
  ...
},
methods: {
  ...
  /********** BEFORE **********/
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
  /********** AFTER **********/
  moveNextMonth() {
    const { month, year } = this.nextMonthComps;
    this.month = month;
    this.year = year;
  },
  movePreviousMonth() {
    const { month, year } = this.previousMonthComps;
    this.month = month;
    this.year = year;
  },
  ...
},
```

The modifications for the `daysInMonth` computed property and `moveNextMonth` and `movePreviousMonth` methods aren’t too drastic, but they do make things a little more terse and intuitive at a glance.

Now let’s review the changes made to the weeks computed property to support displaying days not in the current month.

```javascript
computed: {
  ...
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
        week.push ({
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
        });

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
  },
}
```

We won’t walk through this line-by-line, but here are some highlights:

1. Day/month/year counters are now provided for the previous month. If the current month does happen to start on a Sunday, these counters will get incremented.
2. We now record the month, year and date for each day info object.
3. On the last day of the current month, the counters are reset for the next month. If the current month does happen to end on a Saturday, these counters will never get used.

So now we are able to get more context about the days in the surrounding months even if they lie in the same weeks as the current month.

---

### Easier access to month and weekday labels…

```javascript
computed: {
  ...,
  // State for calendar header (no dependencies yet...)
  months() {
    return _monthLabels.map((ml, i) => ({
      label: ml,
      label_1: ml.substring(0, 1),
      label_2: ml.substring(0, 2),
      label_3: ml.substring(0, 3),
      number: i + 1,
    }));
  },
  // State for weekday header (no dependencies yet...)
  weekdays() {
    return _weekdayLabels.map((wl, i) => ({
      label: wl,
      label_1: wl.substring(0, 1),
      label_2: wl.substring(0, 2),
      label_3: wl.substring(0, 3),
      number: i + 1,
    }));
  },
  ...
}
```

Before, we used a function defined outside of the Vue component instance to produce the labels for our month and weekday names. Now we simply just preassign title cased labels in different lengths (label_n). If they need to be altered, we can simply call `toUpperCase()` or `toLowerCase()` on the labels.

So that’s all the changes we need to get ready for Part 2. I’m really excited for the next tutorial, but until then here’s the Codepen if you’d like to review the modified code.

---

Read the next post: [Part 2: Using `Extends`](/building-a-calendar-in-vuejs-part-ii-using-extends)