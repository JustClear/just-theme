export default function () {
    console.log('global');
    $(document).on('click', '.js-icon-nav', function () {
        $('.js-panel[data-type="menu"]').toggleClass('visible');
    });
}
