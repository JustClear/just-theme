import mediumZoom from 'medium-zoom';

export default function () {
    console.log('article');
    mediumZoom('body[data-page="article"] .article .content img');
}
