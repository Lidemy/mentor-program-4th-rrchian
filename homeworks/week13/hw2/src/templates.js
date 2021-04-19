export const cssTemplate = '.card { margin-top: 12px;}';

export function getLoadMoreButtonHTML(className) {
  return `<button class="${className} btn btn-primary">載入更多</button>`;
}

export function getForm(className, discussionsClassName) {
  return `
    <div>    
      <form class="${className}">
        <div class="form-group">
          <label>暱稱</label>
          <input class="form-control" name="nickname" type="text">
          <label>留言內容</label>
          <textarea class="form-control" name="content" rows="3"></textarea>
        </div>
        <button class="btn btn-primary" type="submit">送出</button>
      </form>
      <div class="${discussionsClassName}">
      </div>
    </div>
    `;
}
