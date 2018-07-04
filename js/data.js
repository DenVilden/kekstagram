'use strict';

(function () {
  var USER_DESCRIPTION = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. ',
    'Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  var template = document.querySelector('#picture').content;
  var picture = document
    .querySelector('#picture')
    .content.querySelector('.picture__link');

  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var pictureCancel = bigPicture.querySelector('#picture-cancel');
  var socialComments = bigPicture.querySelector('.social__comments');
  var socialComment = template.querySelector('.social__comment');
  var imgSort = document.querySelector('.img-filters');

  // Проверка на нажатие ESC
  function photoEscPressHandler(evt) {
    window.util.isEscEvent(evt, previewCloseHandler);
  }

  // Закрывает превью фото
  function previewCloseHandler() {
    bigPicture.classList.add('hidden');
    document.body.removeAttribute('class');
    document.removeEventListener('keydown', photoEscPressHandler);
    socialComments.textContent = '';
  }

  pictureCancel.addEventListener('click', previewCloseHandler);

  /**
   * Создает объект в DOM
   * @param  {Array} arr
   * @return {Object}
   */
  function clonePhoto(arr) {
    picture.querySelector('.picture__img').src = arr.url;
    picture.querySelector('.picture__stat--likes').textContent = arr.likes;
    picture.querySelector('.picture__stat--comments').textContent =
      arr.comments.length;

    return picture.cloneNode(true);
  }

  /**
   * Подставляет значения фото в разметку
   * @param  {Object} clone
   * @param  {Array} arr
   * @return {Object}
   */
  function buildPreview(clone, arr) {
    bigPicture.querySelector('.likes-count').textContent = clone.querySelector(
        '.picture__stat--likes'
    ).textContent;
    bigPicture.querySelector(
        '.comments-count'
    ).textContent = clone.querySelector('.picture__stat--comments').textContent;
    bigPicture.querySelector('.big-picture__img img').src = clone.querySelector(
        '.picture__img'
    ).src;

    socialComment.querySelector('.social__picture').src =
      'img/avatar-' + window.funcs.getRandomNumber(1, 6) + '.svg';
    socialComment.querySelector(
        '.social__text'
    ).textContent = window.funcs.getRandomItem(arr.comments);
    bigPicture.querySelector(
        '.social__caption'
    ).textContent = window.funcs.getRandomItem(USER_DESCRIPTION);

    return socialComment.cloneNode(true);
  }

  /**
   * Получает фото с сервера
   * @param  {Array} data
   */
  window.data = function (data) {
    data.forEach(function (photo) {
      var clone = clonePhoto(photo); // Элемент массива
      clone.addEventListener('click', function () {
        buildPreview(clone, photo);
        bigPicture.classList.remove('hidden');
        document.body.classList.add('modal-open');
        document.addEventListener('keydown', photoEscPressHandler);
      });
      pictures.appendChild(clone);
    });

    imgSort.classList.remove('img-filters--inactive');
  };
})();
