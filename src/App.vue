<template>
  <div class="ui fluid container">
	  <div class="ui blue icon message">
      <i class="info circle icon"></i>
      <div class="content">
        <div class="header">
          Are you planning on visiting us after {{ end }}?
        </div>
        <p><a href="/public-calendar">Click here</a> to see our Public Calendar, which contains all our future confirmed events as they are added.</p>
      </div>
    </div>	
    <div class="ui basic segment" v-for="(day, i) in days" :key="i">
      <div class="ui dividing header">
        {{ format(new Date(day.date), 'EEEE, MMMM dd, yyyy') }}
      </div>
      <div class="ui items" v-if="!loading">
        <div class="item" v-for="event in day.events" :event="event" :key="event.id">
          <div class="image">
          <img :src="event.show.cover">
          </div>
          <div class="content">
            <div class="header">{{ event.show.name }}</div>
            <div class="meta">
              
            </div>
            <div class="meta">
              <div class="ui blue label">{{ event.show.type }}</div>
              <div class="ui basic blue label">{{ event.show.duration }} minutes</div>
              <div class="ui blue label">{{ event.type.name }}</div>
              <div class="ui basic blue label">
                {{ format(new Date(event.start), "EEEE, MMMM dd, yyyy 'at' hh:mm a") }}
                <div class="detail">
                  {{ formatDistanceToNow(new Date(event.start), { addSuffix: true }) }}
                </div>
              </div>
            </div>
            <div class="meta">
              <ticket-item v-for="ticket in event.allowedTickets" :ticket="ticket" :key="ticket.id" />
            </div>
            <div class="description" v-html="marked(event.show.description, { sanizite: true })"></div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="ui text loader">Loading...</div>
  </div>
</template>

<script>

  import { addDays, format, formatDistanceToNow } from 'date-fns'
  import axios from 'axios'
  import marked from 'marked'

  export default {
    data: () => ({
      days    : [],
      loading : true,
      end     : addDays(new Date(), 7)
    }),
    methods: {
      async fetchEvents() {
        const today = new Date()
        const start = format(today, 'yyyy-MM-dd')
        const end   = format(this.end, 'yyyy-MM-dd')
        try {
          const response = await axios.get(`${SERVER}/api/events/by-date?start=${start}&end=${end}`)
          Object.assign(this, { days: response.data.data })
          Object.assign(this, { loading: false })
        } catch (error) {
          console.log(error.message)
        }
      },
      format,
      formatDistanceToNow,
      marked,
    },
    async created() {
      await this.fetchEvents()
    },
  }
</script>