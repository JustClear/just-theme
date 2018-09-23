export default function (app) {
    console.log('global');
    
    const travis = app.common.getQuery('travis');

    if (travis == 'go') {
        location.href = `https://travis-ci.org/infini-design/infini-design.github.io`;
    }

    $(document).on('click', '.js-icon-nav', function () {
        $('.js-panel[data-type="menu"]').toggleClass('visible');
    });
}
