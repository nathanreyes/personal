<img class='block mx-auto md:w-3/4 mb-6' src='https://res.cloudinary.com/dqgcfqzpk/image/upload/v1522241033/personal/posts/meet-v-calendar/cover.png'>

Several months ago, I set out to write part 3 in my series on building an extendable calendar using Vue.js. Unfortunately, I’m sad to report that this is not that article! :(

However, it’s not all sad faces because what bore from it was a full-blown calendar plugin. It has been in the works for these past few months, and I’m excited to finally share it with others who love to make things with Vue.js.

It’s called V-Calendar, and while it was born from my desire for an all in one calendar solution, I also just wanted to see how far I could get with stock Vue.js and all of the features it provides. While this plugin doesn’t satisfy all of my needs as of yet, it still goes a long way towards my ultimate utopian calendar solution. Here are some preliminary goals for the plugin:

* Clean and lively design with judicious use of transitions
* Highly flexible with support for custom month and weekday labels, single/double-paned layouts, theming, etc.)
* Simple API for displaying highlights, dot indicators, bar indicators and styled day content
* Date picker support out of the box

### Base Calendar

<img class='block mx-auto my-6' src='https://res.cloudinary.com/dqgcfqzpk/image/upload/v1522241034/personal/posts/meet-v-calendar/base-calendar.gif'>

```html
<template>
  <v-calendar
    is-double-paned>
  </v-calendar>
</template>
```

The base calendar is designed with as little flair as possible, but still provides an understated, simplified appearance that should integrate well with most applications. Here are some other points to note about the base calendar upon examination:

1. Support for single and double-paned calendars.
2. When double-paned, navigation is coordinated appropriately between the two panes.
3. By default, horizontal slide animations are used during navigation with other options including vertical slide, fade and no animations.
4. When the header title is hovered, a semantic inspired navigation panel displays (with a few tricks up it’s sleeve, as we’ll see later).

### Attributes

Attributes are the most important concept to understand with V-Calendar. Fortunately, they are simple to understand and they provide a powerful way to communicate information to your users. Think of an attribute like a decorator for calendar day cells. Any single attribute may target multiple dates or date ranges (with a start and end date), and each may include one of each of the following objects:

* Highlight
* Dot Indicator
* Bar Indicator
* Day Content Style

Reference the attribute definition below

```javascript

// Attribute structure
{
  key: String,  // Used to uniquely identify attribute, may affect how it is animated
  highlight: Object, // Highlight to display for the attribute (reference structure below)
  dot: Object, // Dot indicator to display for the attribute (reference structure below)
  bar: Object, // Bar indicator to display for the attribute (reference structure below)
  contentStyle: Object, // Style object to apply to day cell content
  contentHoverStyle: Object, // Style object to apply to day cell content when hovered (merged with contentStyle)
  dates: Array[Date or Object], // List of date like values or date ranges (w/ start and end date) to apply the attribute
  order: Number // By default, attributes are layered to display the most data possible, but this may be used for manual ordering
}

// Highlight structure
{
  animated: Boolean, // Default: true
  height: String, // Default: "1.8rem"
  backgroundColor: String, // Default: undefined
  borderColor: String, // Default: undefined
  borderWidth: String, // Default: "0"
  borderStyle: String, // Default: "solid"
  borderRadius: String // Default: "1.8rem"
}

// Dot indicator structure
{
  diameter: String, // Default: "5px"
  backgroundColor: String, // Default: undefined
  borderColor: String, // Default: undefined
  borderWidth: String, // Default: "0"
  borderStyle: String, // Default: "solid"
  borderRadius: String, // Default: "50%"
}
  
// Bar indicator structure
{
  height: String, // Default: "5px"
  backgroundColor: String, // Default: undefined
  borderColor: String, // Default: undefined
  borderWidth: String, // Default: "0"
  borderStyle: String, // Default: "solid"
}
```

For example, let’s take a look at how to use highlights in practice.

### Highlights

Highlights appear as spanned regions of styled bordered backgrounds. Usually, you’ll want to pair a highlight with a content style as well so that text is legible within the highlighted region. Highlights that span date ranges appear as continuous background regions from the defined start date to the end date. The border radius only applies to the highlighted end caps.

<img class='md:w-3/4' src='https://res.cloudinary.com/dqgcfqzpk/image/upload/v1522241033/personal/posts/meet-v-calendar/highlights.png'>

The example above can be represented using 3 attributes. Each attribute has a defined highlight with an associated content style (a style that is just applied to the day label content) so that the days are clearly legible when displayed within the highlighted backgrounds. Finally, we also need to provide an array of dates or date ranges over which each attribute is to be applied.

```html
<template>
  <v-calendar
    :attributes='attributes'
    is-double-paned>
  </v-calendar>
</template>

<script>
import { getExampleMonthComps } from '@/utils/helpers';
export default {
  data() {
    const {
      thisMonth,
      thisMonthYear,
      nextMonth,
      nextMonthYear } = getExampleMonthComps();
    return {
      attributes: [
        {
          highlight: {
            backgroundColor: '#ff8080', // Red
            borderColor: '#ff6666',
            borderWidth: '2px',
            borderStyle: 'solid',
          },
          contentStyle: {
            color: 'white',
          },
          dates: [
            // Use date ranges
            {
              start: new Date(thisMonthYear, thisMonth, 1),
              end: new Date(thisMonthYear, thisMonth, 4),
            },
            // Or single dates
            new Date(nextMonthYear, nextMonth, 6),
            new Date(nextMonthYear, nextMonth, 23),
          ],
        },
        {
          highlight: {
            backgroundColor: '#9f80ff', // Purple
            borderColor: '#8c66ff',
            borderWidth: '2px',
          },
          contentStyle: {
            color: 'white',
          },
          dates: [
            new Date(thisMonthYear, thisMonth, 1),
            new Date(thisMonthYear, thisMonth, 10),
            new Date(thisMonthYear, thisMonth, 12),
            {
              start: new Date(nextMonthYear, nextMonth, 22),
              end: new Date(nextMonthYear, nextMonth, 26),
            },
          ],
        },
        {
          highlight: {
            backgroundColor: '#66b3cc', // Turquoise
            borderColor: '#53a9c6',
            borderWidth: '2px',
            borderRadius: '5px',
          },
          contentStyle: {
            color: 'white',
          },
          dates: [
            new Date(thisMonthYear, thisMonth, 14),
            {
              start: new Date(thisMonthYear, thisMonth, 24),
              end: new Date(thisMonthYear, thisMonth, 25),
            },
            new Date(thisMonthYear, thisMonth, 28),
            new Date(nextMonthYear, nextMonth, 4),
            {
              start: new Date(nextMonthYear, nextMonth, 16),
              end: new Date(nextMonthYear, nextMonth, 17),
            },
          ],
        },
      ],
    };
  },
};
</script>
```

### Dot Indicators

Dot indicators are another kind of object that can be defined within attributes. They follow the same rules as highlights, and can even be applied over date ranges as well. When a date range is used, the indicator is simply repeated for each day within the range.

<img class='md:w-3/4' src='https://res.cloudinary.com/dqgcfqzpk/image/upload/v1522241033/personal/posts/meet-v-calendar/dots.png'>

```html
<template>
  <v-calendar
    :attributes='attributes'
    is-double-paned>
  </v-calendar>
</template>

<script>
import { getExampleMonthComps } from '@/utils/helpers';
export default {
  data() {
    const { thisMonth, thisMonthYear, nextMonth, nextMonthYear } = getExampleMonthComps();
    return {
      attributes: [
        {
          dot: {
            backgroundColor: '#ff4d4d', // Red
          },
          dates: [
            new Date(thisMonthYear, thisMonth, 1),
            new Date(thisMonthYear, thisMonth, 10),
            new Date(thisMonthYear, thisMonth, 22),
            new Date(nextMonthYear, nextMonth, 6),
            new Date(nextMonthYear, nextMonth, 16),
          ],
        },
        {
          dot: {
            backgroundColor: '#398fac', // Turquoise
          },
          dates: [
            new Date(thisMonthYear, thisMonth, 4),
            new Date(thisMonthYear, thisMonth, 10),
            new Date(thisMonthYear, thisMonth, 15),
            new Date(nextMonthYear, nextMonth, 1),
            new Date(nextMonthYear, nextMonth, 12),
            {
              start: new Date(nextMonthYear, nextMonth, 20),
              end: new Date(nextMonthYear, nextMonth, 25),
            },
          ],
        },
        {
          dot: {
            backgroundColor: '#794dff', // Purple
          },
          dates: [
            new Date(thisMonthYear, thisMonth, 12),
            new Date(thisMonthYear, thisMonth, 26),
            new Date(thisMonthYear, thisMonth, 15),
            new Date(nextMonthYear, nextMonth, 9),
            new Date(nextMonthYear, nextMonth, 5),
            new Date(nextMonthYear, nextMonth, 6),
            new Date(nextMonthYear, nextMonth, 20),
            new Date(nextMonthYear, nextMonth, 25),
          ],
        },
      ],
    };
  },
};
</script>
```

### Bar Indicators

Bars indicators behave exactly the same as dot indicators. They just appear as bars spread evenly across the bottom of day cells.

<img class='md:w-3/4' src='https://res.cloudinary.com/dqgcfqzpk/image/upload/v1522241032/personal/posts/meet-v-calendar/bars.png'>

```html
<template>
  <v-calendar
    :attributes='attributes'
    is-double-paned>
  </v-calendar>
</template>

<script>
import { getExampleMonthComps } from '@/utils/helpers';
export default {
  data() {
    const { thisMonth, thisMonthYear, nextMonth, nextMonthYear } = getExampleMonthComps();
    return {
      attributes: [
        {
          bar: {
            backgroundColor: '#ff4d4d', // Red
          },
          dates: [
            new Date(thisMonthYear, thisMonth, 1),
            new Date(thisMonthYear, thisMonth, 10),
            new Date(thisMonthYear, thisMonth, 22),
            new Date(nextMonthYear, nextMonth, 6),
            new Date(nextMonthYear, nextMonth, 16),
          ],
        },
        {
          bar: {
            backgroundColor: '#398fac', // Turquoise
          },
          dates: [
            new Date(thisMonthYear, thisMonth, 4),
            new Date(thisMonthYear, thisMonth, 10),
            new Date(thisMonthYear, thisMonth, 15),
            new Date(nextMonthYear, nextMonth, 1),
            new Date(nextMonthYear, nextMonth, 12),
            {
              start: new Date(nextMonthYear, nextMonth, 20),
              end: new Date(nextMonthYear, nextMonth, 25),
            },
          ],
        },
        {
          bar: {
            backgroundColor: '#794dff', // Purple
          },
          dates: [
            new Date(thisMonthYear, thisMonth, 12),
            new Date(thisMonthYear, thisMonth, 26),
            new Date(thisMonthYear, thisMonth, 15),
            new Date(nextMonthYear, nextMonth, 9),
            new Date(nextMonthYear, nextMonth, 5),
            new Date(nextMonthYear, nextMonth, 6),
            new Date(nextMonthYear, nextMonth, 20),
            new Date(nextMonthYear, nextMonth, 25),
          ],
        },
      ],
    };
  },
};
</script>
```

### Content Styles

In addition to being used in conjunction with other attribute objects, content styles can be used independently.

<img class='md:w-3/4' src='https://res.cloudinary.com/dqgcfqzpk/image/upload/v1522241033/personal/posts/meet-v-calendar/content-styles.png'>

```html
<template>
  <v-calendar
    :attributes='attributes'
    is-double-paned
    :min-page='minPage'>
  </v-calendar>
</template>

<script>
import { getExampleMonthComps } from '@/utils/helpers';
export default {
  data() {
    const {
      thisMonth,
      thisMonthYear,
      nextMonth,
      nextMonthYear } = getExampleMonthComps();
    return {
      minPage: {
        month: 4,
        year: 2016,
      },
      attributes: [
        {
          contentStyle: {
            color: '#ff4d4d', // Red
            fontWeight: 600,
            fontSize: '1em',
          },
          dates: [
            {
              start: new Date(thisMonthYear, thisMonth, 1),
              end: new Date(thisMonthYear, thisMonth, 4),
            },
            new Date(nextMonthYear, nextMonth, 6),
            new Date(nextMonthYear, nextMonth, 23),
          ],
        },
        {
          contentStyle: {
            color: '#398fac', // Turquoise
            fontWeight: 600,
            fontStyle: 'italic',
          },
          dates: [
            new Date(thisMonthYear, thisMonth, 1),
            new Date(thisMonthYear, thisMonth, 10),
            new Date(thisMonthYear, thisMonth, 12),
            {
              start: new Date(nextMonthYear, nextMonth, 22),
              end: new Date(nextMonthYear, nextMonth, 26),
            },
          ],
        },
        {
          contentStyle: {
            color: '#794dff', // Purple
            fontWeight: 600,
          },
          dates: [
            new Date(thisMonthYear, thisMonth, 14),
            {
              start: new Date(thisMonthYear, thisMonth, 24),
              end: new Date(thisMonthYear, thisMonth, 25),
            },
            new Date(thisMonthYear, thisMonth, 28),
            new Date(thisMonthYear, thisMonth + 1, 4),
            {
              start: new Date(nextMonthYear, nextMonth, 16),
              end: new Date(nextMonthYear, nextMonth, 17),
            },
          ],
        },
      ],
    };
  },
};
</script>
```

### Navigation

A semantic-inspired navigation panel allows the user to jump to desired months and years when the header title is hovered (on desktop) or clicked (on mobile). One really nice additional feature with the drop-down navigation panel is that it can use any supplied attributes to display indicators for calendar month cells. The aim with this design was to help provide some additional context for users of your web applications.

<img src='https://res.cloudinary.com/dqgcfqzpk/image/upload/v1522241034/personal/posts/meet-v-calendar/navigation.gif'>

### Date Picker

Because of the flexibility built in to v-calendar, adding date picker support out of the box was pretty trivial, as v-date-picker is just a v-calendar wrapper that proxies all props and events. It merely provides some additional state and attribute definitions needed to support the following date selection modes:

* Single date
* Multiple dates
* Date range

Other date picker features include options for inline display, custom input slots, custom selection attribute, date formatting and more.

<img src='https://res.cloudinary.com/dqgcfqzpk/image/upload/v1522241034/personal/posts/meet-v-calendar/date-picker.gif'>

### Conclusion

For the sake of brevity I won’t get into other plugin features, but be on the look out for tutorials on other topics such as custom theming and easily integrating your apps via the API. In summary, my hope is that others will find this plugin useful and get inspired to make great apps with Vue.js.

Please keep in mind that this project is still in beta and there are still plenty of things to tidy up. Having said that, if you would like to research or contribute, check the project out on [github](https://github.com/nathanreyes/v-calendar) or visit the [project website](https://vcalendar.io) to view API documentation and follow along with examples.