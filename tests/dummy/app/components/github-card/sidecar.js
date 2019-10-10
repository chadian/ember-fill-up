import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../../templates/components/github-card/sidecar';

export default Component.extend({
  layout,

  tagName: '',

  repo: null,

  formattedUpdatedDate: computed('repo.updatedDate', function() {
    const updatedDate = this.repo.updatedDate;
    return `${timeSince(updatedDate)} ago`;
  })
});

// from stackoverflow:
// https://stackoverflow.com/a/3177838
function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}