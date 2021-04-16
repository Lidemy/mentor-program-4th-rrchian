/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import $ from 'jquery';

export function getDiscussions(apiUrl, siteKey, before, cb) {
  let url = `${apiUrl}/api_comments.php?site_key=${siteKey}`;

  if (before) {
    url += `&before=${before}`;
  }

  $.ajax({
    url,
  }).done(data => cb(data));
}

export function addDiscussions(apiUrl, siteKey, data, cb) {
  $.ajax({
    type: 'POST',
    url: `${apiUrl}/api_add_comments.php`,
    data,
  }).done(data => cb(data));
}
