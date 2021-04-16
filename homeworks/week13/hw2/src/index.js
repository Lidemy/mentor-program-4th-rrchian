/* eslint-disable import/prefer-default-export */
/* eslint-disable no-alert */
/* eslint-disable prefer-const */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
/* eslint-env jquery */
import $ from 'jquery';
import { getDiscussions, addDiscussions } from './api';
import { appendDiscussionToDOM, appendStyle } from './utils';
import { cssTemplate, getLoadMoreButtonHTML, getForm } from './templates';

export function init(options) {
  let siteKey = '';
  let apiUrl = '';
  let containerElement = null;
  let discussionDOM = null;
  let lastId = null;
  let isEnd = false;
  let loadMoreClassName;
  let discussionsClassName;
  let discussionsSelector;
  let formClassName;
  let formSelector;

  siteKey = options.siteKey;
  apiUrl = options.apiUrl;

  loadMoreClassName = `${siteKey}-load-more`;
  discussionsClassName = `${siteKey}-discussions`;
  discussionsSelector = `.${discussionsClassName}`;
  formClassName = `${siteKey}-add-discussion-form`;
  formSelector = `.${formClassName}`;

  containerElement = $(options.containerSelector);
  containerElement.append(getForm(formClassName, discussionsClassName));

  appendStyle(cssTemplate);

  function getNewDiscussions() {
    discussionDOM = $(discussionsSelector);
    $(`.${loadMoreClassName}`).hide();
    if (isEnd) {
      return;
    }
    getDiscussions(apiUrl, siteKey, lastId, (data) => {
      if (!data.ok) {
        alert(data.message);
        return;
      }
      const discussions = data.discussions;
      discussions.forEach(discussion => appendDiscussionToDOM(discussionDOM, discussion));
      let length = discussions.length;
      if (length === 0) {
        isEnd = true;
        $(`.${loadMoreClassName}`).hide();
      } else {
        lastId = discussions[length - 1].id;
        const loadMoreButtonHTML = getLoadMoreButtonHTML(loadMoreClassName);
        $(discussionsSelector).append(loadMoreButtonHTML);
      }
    });
  }

  discussionDOM = $(discussionsSelector);
  getNewDiscussions();

  $(discussionsSelector).on('click', `.${loadMoreClassName}`, () => {
    getNewDiscussions();
  });

  $(formSelector).submit((e) => {
    e.preventDefault();
    const nickNameDOM = $(`${formSelector} input[name=nickname]`);
    const contentDOM = $(`${formSelector} textarea[name=content]`);
    const newDiscussion = {
      site_key: siteKey,
      nickname: nickNameDOM.val(),
      content: contentDOM.val(),
    };
    addDiscussions(apiUrl, siteKey, newDiscussion, (data) => {
      if (!data.ok) {
        alert(data.message);
        return;
      }
      // make input and textarea empty by ''
      nickNameDOM.val('');
      contentDOM.val('');
      appendDiscussionToDOM(discussionDOM, newDiscussion, true);
    });
  });
}
