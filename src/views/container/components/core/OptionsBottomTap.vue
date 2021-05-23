<template>
  <v-col
    cols="12"
    md="12"
  >
    <span
      v-if="infoRequired"
      class="params red--text"
    >{{ $t('required.label') }}</span>

    <v-fab-transition>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn
            v-if="isModeSave"
            color="green darken-1"
            dark
            absolute
            bottom
            right
            fab
            :class="{ 'btn-save-flat': isModeSave, 'btn-save-no-arrow': noArrow }"
            v-on="on"
            @click="onSaveButton"
          >
            <v-icon>mdi-content-save-outline</v-icon>
          </v-btn>
        </template>
        <span>{{ $t("tooltip.save") }}</span>
      </v-tooltip>
    </v-fab-transition>

    <v-fab-transition>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn
            v-if="isModeSave"
            color="red"
            dark
            absolute
            bottom
            right
            fab
            :class="{ 'btn-save-flat': !isModeSave, 'btn-cancel-flat': isModeSave,'btn-cancel-no-arrow': noArrow, 'cancel-button-delete': noCancel, 'btn-cancel-no-save': noSave}"
            v-on="on"
            @click="onCancelButton"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
        <span>{{ $t("tooltip.cancel") }}</span>
      </v-tooltip>
    </v-fab-transition>

    <v-fab-transition>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn
            v-if="!noArrow"
            color="secondary"
            dark
            absolute
            bottom
            right
            fab
            v-on="on"
            @click="nextTap"
          >
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </template>
        <span>{{ $t("tooltip.next_tab") }}</span>
      </v-tooltip>
    </v-fab-transition>
  </v-col>
</template>

<script>
  export default {
    props: {
      tapNumber: {
        // next tap to go
        type: Number,
        default: 0,
      },
      // tells the component if user is in save and edit mode
      isModeSave: Boolean,
      // tells the component if user is going to save
      onSave: Boolean,
      // tells the component if user is onling watching an element
      isViewMode: Boolean,
      // hide arrow buttom
      noArrow: {
        type: Boolean,
        default: false,
      },
      // shows users there's required data to save
      infoRequired: {
        type: Boolean,
        default: false,
      },
      // hide cancel buttom
      noCancel: {
        type: Boolean,
        default: false,
      },
      // hide save buttom
      noSave: {
        type: Boolean,
        default: false,
      },
    },
    mounted () {},
    methods: {
      // these methods tell to parent component an action
      nextTap () {
        // go to next tap emit method
        this.$emit('nextTap', this.tapNumber)
      },
      onSaveButton: function () {
        // save emit method
        this.$emit('onSave')
      },
      onCancelButton: function () {
        // cancel emit method
        this.$emit('onCancelButton')
      },
    },
  }
</script>

<style>
.btn-cancel-flat {
  right: 134px !important;
}
.btn-save-flat {
  right: 75px !important;
}

.btn-save-no-arrow {
  right:20px !important;
}

.btn-cancel-no-arrow {
  right:80px !important;
}

.btn-cancel-no-save {
  right: 75px !important;
}

.params {
  color: darkgrey;
  position: absolute;
  bottom: 0;
  left: 20px;
}

.cancel-button-delete {
    display:none !important;
}
</style>
