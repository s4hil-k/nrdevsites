<template>
  <md-card>
    <md-card-header class="card-chart" :data-background-color="dataBackgroundColor"  v-bind:style="{backgroundSize: 'cover',backgroundImage : 'url(' + dataImg + ')' }">
      <div class="ct-chart"></div>
    </md-card-header>

    <md-card-content>
      <slot name="content"></slot>
    </md-card-content>

    <md-card-actions md-alignment="left">
      <slot name="footer"></slot>
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
	name: 'site-card',
	props: {
		dataBackgroundColor: {
      type: String,
      default: ''
    },
    dataImg: {
      type: String,
      default: ''
    },
    data () {
    return {
    }
  },
	}
}
</script>
