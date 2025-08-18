---
title: '重构方法的速写'
author: 'Lucas Liu'
description: '《重构：改善既有代码的设计》中包含的重构方法速写'
pubDate: 2025-08-18
tags: ['重构']
---

## 第一组重构

### 1.1 提炼函数（Extract Function）

```js
// before
function printOwing(invoice) {
    printBanner();
    let outstanding = calculateOutstanding(invoice);
    
    // print details
    console.log(`name: ${invoice.customer}`);
    console.log(`amount: ${outstanding}`);
}

// after
function printDetails(invoice) {
    printBanner();
    let outstanding = calculateOutstanding();
    printDetails(outstanding);

    function printDetails(outstanding) {
        console.log(`name: ${invoice.customer}`);
        console.log(`amount: ${outstanding}`);
    }
}
```

### 1.2 内联函数（Inline Function）

```js
// before   
function getRating(driver) {
    return moreThanFiveLateDeliveries(driver) ? 2 : 1;
}

function moreThanFiveLateDeliveries(driver) {
    return driver.lateDeliveries > 5;
}

// after
function getRating(driver) {
    return (driver.lateDeliveries > 5) ? 2 : 1;
}
```

### 1.3 提炼变量（Extract Variable）

```js
// before
function fn(order) {
    return order.quantity * order.itemPrice - Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 + Math.min(order.quantity * order.itemPrice * 0.1, 100);
}

// after
function fn(order) {
    const basePrice = order.quantity * order.itemPrice;
    const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
    const shipping = Math.min(order.quantity * order.itemPrice * 0.1, 100);
    return basePrice - quantityDiscount + shipping;
}
```

### 1.4 内联变量（Inline Variable）
```js
// before
function fn(anOrder) {
    let basePrice = anOrder.basePrice;
    return (basePrice > 1000);
}

// after
function fn(anOrder) {
    return (anOrder.basePrice > 1000);
}
```

### 1.5 改变函数声明（Change Function Declaration）

```js
// before
function circum(radius) { /* some code */ }

// after
function circumference(radius) { /* some code */ }
```

### 1.6 封装变量（Encapsulate Variable）

```js
// before
let defaultOwner = { firstName: "martin", lastName: "Fowler" };

// after
let defaultOwnerData = {
    firstName: "martin",
    lastName: "Fowler"
};

export function defaultOwner() {
    return defaultOwnerData;
}

export function setDefaultOwner(arg) {
    defaultOwnerData = arg;
}
```

### 1.7 变量改名（Rename Variable）

```js
// before
let a = height * width;

// after
let area = height * width;
```

### 1.8 引入参数对象（Introduce Parameter Object）

```js
// before
function amountInvoiced(startDate, endDate) { /* some code */ }
function amountReceived(startDate, endDate) { /* some code */ }
function amountOverdue(startDate, endDate) { /* some code */ }

// after
function amountInvoiced(aDateRange) { /* some code */ }
function amountReceived(aDateRange) { /* some code */ }
function amountOverdue(aDateRange) { /* some code */ }
```

### 1.9 函数组合成类（Combine Functions into Class）

```js
// before
function base(aReading) { /* some code */ }
function taxableCharge(aReading) { /* some code */ }
function calculateBaseCharge(aReading) { /* some code */ }

// after
class Reading {
    base() { /* some code */ }
    taxableCharge() { /* some code */ }
    calculateBaseCharge() { /* some code */ }
}
```

### 1.10 函数组合成变换（Combine Function into Transform）

```js
// before
function base(aReading) { /* some code */ }
function taxableCharge(aReading) { /* some code */ }

// after
function enrichReading(argReading) {
    const aReading = _.cloneDeep(argReading);
    aReading.base = base(aReading);
    aReading.taxableCharge = taxableCharge(aReading);
    return aReading;
}
```

### 1.11 拆分阶段（Split Phase）

```js
// before
const orderDate = orderString.split(/\s+/);
const productPrice = priceList[orderData[0].split("-")[1]];
const orderPrice = parseInt(orderData[1]) * productPrice;

// after
const orderRecord = parseOrder(order);
const orderPrice = price(orderRecord, priceList);

function parseOrder(aString) {
    const values = aString.split(/\s+/);
    return ({
        productID: values[0].split("-")[1],
        quantity: parseInt(values[1]),
    })
}

function price(order, priceList) {
    return order.quantity * priceList[order.productID];
}
```
