function add(a, b, callback) {
    const result = a + b;
    callback(result);
}

add(5, 3, (result) => {
    console.log(`The sum is: ${result}`);
});
  