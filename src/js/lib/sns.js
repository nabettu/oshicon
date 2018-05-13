import qs from 'querystring';

export default function sns({type, url, text, hashtags}) {
    if (!url || !text) {
        return
    }
    switch (type) {
        case 'twitter':
            let twContent = {
                url: url,
                text: text
            };
            if (hashtags) {
                twContent.hashtags = hashtags.join(' #');
            }
            const twurl = 'https://twitter.com/share?' + qs.stringify(twContent);
            window.open(twurl);
            break;
        case 'line':
            const lineUrl = 'http://line.me/R/msg/text?' + [encodeURIComponent(text), encodeURIComponent(url)].join(' ');
            location.href = lineUrl;
            break;
        case 'facebook':
            const fburl = 'http://www.facebook.com/sharer.php?u=' + url;
            window.open(fburl);
            break;
        case 'copy':
            const temp = document.createElement('div');
            temp.style.position = 'absolute';
            temp.style.top = '0';
            temp.style.left = '0';
            temp.innerHTML = (text + ' ' + url).replace(/\n/g, '<br>');

            document.body.appendChild(temp);
            const range = document.createRange();
            range.selectNode(temp);
            const selection = document.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);

            const result = document.execCommand('copy');
            document.body.removeChild(temp);
            return result;
        default:
    }
}
