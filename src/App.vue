<template>
  <div>
    
    <div class="ui basic segment">
      <div class="ui blue icon message">
        <i class="info circle icon"></i>
        <div class="content">
          <div class="header">Check out our app!</div>
          <p><a href="/go-beyond/app">Click here</a> to download it!</p>
        </div>
      </div>
      
      <div class="ui blue icon message">
        <i class="info circle icon"></i>
        <div class="content">
          <div class="header">
            Are you planning on visiting us after
            {{ format(new Date(end), 'EEEE, MMMM d') }}?
          </div>
          <p>
            <a href="/public-calendar">Click here</a> to see our Public
            Calendar, which contains all our future confirmed events as they are
            added.
          </p>
        </div>
      </div>
    </div>

    <div class="ui basic segment">
      <div :class="`ui ${ announcement.type } icon message`" v-for="announcement in announcements" :key="announcement.id">
        <i class="info circle icon"></i>
        <div class="content">
          <div class="header">
            {{ announcement.title }}
          </div>
          <p v-html="announcement.content"></p>
        </div>
      </div>
    </div>

    <div
      class="ui basic segment"
      v-for="(day, i) in days"
      :key="i"
      v-show="day.events.length > 0"
    >
      <div class="ui dividing header">
        <i class="calendar alternate outline icon"></i>
        <div class="content">
          {{ format(new Date(day.date), 'EEEE, MMMM d') }}
        </div>
      </div>
      <div class="ui divided items" v-if="!loading">
        <event-box :event="event" v-for="event in day.events" :key="event.id" />
      </div>
    </div>
    <div class="ui basic segment">
      <div class="ui basic right aligned segment">
        <a
          href="https://astral.anderfernandes.com"
          target="_blank"
          class="ui black tiny image label"
        >
          <img
            src="https://astral.anderfernandes.com/assets/astral-logo-light.png"
            alt
          />
          Powered by Astral
        </a>
      </div>
    </div>
    <div class="ui text loader">Loading...</div>
  </div>
</template>

<script>
  import EventBox from './components/EventBox.vue'
  import { addDays, format } from 'date-fns'
  import axios from 'axios'

  export default {
    data: () => ({
      days: [],
      loading: true,
      end: addDays(new Date(), 14),
      cover: null,
      announcements: [],
    }),
    components: { EventBox },
    methods: {
      async fetchEvents() {
        const today = new Date()
        const start = format(today, 'yyyy-MM-dd')
        const end = format(this.end, 'yyyy-MM-dd')
        try {
          const response = await axios.get(
            `${SERVER}/api/events/by-date?start=${start}&end=${end}`
          )
          Object.assign(this, { days: response.data.data })
          Object.assign(this, { loading: false })
          Object.assign(this, { announcements: response.data.announcements })
        } catch (error) {
          console.log(error.message)
        }
      },
      async fetchCover() {
        try {
          const response = await axios.get(
            'https://astral.ctcd.org/api/settings'
          )
          Object.assign(this, {
            cover: `https://astral.ctcd.org/storage/${response.data.cover}`,
          })
        } catch (error) {
          console.log(error.message)
        }
      },
      format,
    },
    async mounted() {
      await this.fetchCover()
      await this.fetchEvents()
    },
  }
</script>
<style>
  .ui.embed > .placeholder {
    width: inherit !important;
    transform: translate(-50%, -50%) !important;
    left: 50%;
    top: 50%;
  }
</style>
