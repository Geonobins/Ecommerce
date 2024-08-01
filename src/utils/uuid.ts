 const  generateNumericUUIDNumber = () => {
    let d = new Date().getTime(); // Timestamp
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); // Add high-resolution time
    }

    let uuid = '';
    for (let i = 0; i < 16; i++) {
        const r = (d + Math.random() * 10) % 10 | 0; // Random number from 0 to 9
        d = Math.floor(d / 10); // Shift the timestamp
        uuid += r.toString(); // Append numeric representation
    }

    return parseInt(uuid, 10);
}

export default generateNumericUUIDNumber