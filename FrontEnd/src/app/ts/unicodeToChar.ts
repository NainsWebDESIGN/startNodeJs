export default (unicode) =>
    String.fromCharCode(parseInt(unicode.substring(2), 16));