module.exports = function getFolderNameFromTimestamp () {
    const date = new Date();
    
    // DAY
    const D = String(date.getDate());
    const DD = D.length === 1 ? `0${D}` : D;

    // MONTH
    const M = String(date.getMonth() + 1);
    const MM = M.length === 1 ? `0${M}` : M;

    // YEAR
    const YY = String(date.getFullYear());

    // HOURS
    const h = String(date.getHours());
    const hh = h.length === 1 ? `0${h}` : h;

    // MINUTES
    const m = String(date.getMinutes());
    const mm = m.length === 1 ? `0${m}` : m;

    // SECONDS
    const s = String(date.getSeconds());
    const ss = s.length === 1 ? `0${s}` : s;

    return `${DD}_${MM}_${YY}_${hh}_${mm}_${ss}`;
}