<template>
  <div class="item">
    <div class="image">
      <img :src="event.show.id == 1 ? cover : event.show.cover" />
      <br />
      <div class="ui fluid black button" @click="toggleTrailer" v-if="event.show.trailer_url">
        <i class="film icon"></i>
        {{ show_trailer ? 'Hide' : 'View' }} Trailer
      </div>
    </div>
    <div class="content">
      <div class="header">{{ event.show.id == 1 ? event.memo : event.show.name }}</div>
      <div class="meta">
        <div class="ui basic blue label">
          <i class="calendar alternate outline icon"></i>
          {{ format(new Date(event.start), "EEEE, MMMM d, yyyy '@' hh:mm a") }}
          ({{ formatDistanceToNow(new Date(event.start), { addSuffix: true }) }})
        </div>
      </div>
      <div class="meta">
        <div class="ui blue label" v-if="event.show.id != 1">
          <i class="film icon"></i>
          {{ event.show.type }}
        </div>
        <div class="ui blue label">
          <i class="tag icon"></i>
          {{ event.type.name }}
        </div>
        <div class="ui basic blue label" v-if="event.show.id != 1">
          <i class="clock icon"></i>
          {{ event.show.duration }} minutes
        </div>
        <div class="ui yellow label" v-if="(event.seats.total / event.seats.available) < 0.25">
          <i class="ticket icon"></i>
          {{ event.seats.available }} seats available
        </div>
        <div class="ui red label" v-else-if="(event.seats.total / event.seats.available) < 0.1">
          <i class="ticket icon"></i>
          {{ event.seats.available }} seats available
        </div>
        <div class="ui basic blue label" v-else>
          <i class="ticket icon"></i>
          {{ event.seats.available }} seats available
        </div>
      </div>
      <div
        class="description"
        v-html="marked(event.show.id == 1 ? event.memo : event.show.description, { sanizite: true })"
      ></div>
      <div class="description" v-if="event.show.trailer_url && show_trailer">
        <sui-embed
          :placeholder="event.show.cover"
          :source="event.show.trailer_provider"
          :id="event.show.trailer_id"
        />
      </div>
      <div class="meta">
        <div class="ui green label" v-for="ticket in event.type.allowed_tickets" :key="ticket.id">
          <i class="ticket icon"></i>
          $ {{ parseFloat(ticket.price).toFixed(2) }} / {{ ticket.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addDays, format, formatDistanceToNow } from "date-fns";
import marked from "marked";

export default {
  props: ["event"],
  data: () => ({
    show_trailer: false
  }),
  methods: {
    toggleTrailer() {
      this.show_trailer = !this.show_trailer;
    },
    format,
    formatDistanceToNow,
    marked
  }
};
</script>