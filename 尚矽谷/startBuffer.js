// 1. alloc 對每個2進制清零
let buf = Buffer.alloc(10);
// console.log(buf);

// 2. allocUnsafe 不對2進制清零
let buf_2 = Buffer.allocUnsafe(10000);
// console.log(buf_2);

// 3. from
let buf_3 = Buffer.from("Hello");
let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117]);
console.log(buf_4);
