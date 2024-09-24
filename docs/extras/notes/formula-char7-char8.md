---
order: 2
---

# 序列与生成函数

## 某牛顿二项式定理的推论

$$
\frac{1}{(1-z)^m} = \sum_{n=0}^{\infty} \binom{m+n-1}{n} z^n, \quad |z| \lt 1
$$

### 立方数的拆分技巧

$$
n^3 = 6\binom{n}{3} + 6\binom{n}{2} + \binom{n}{1}
$$

## Catalan 数

$$
C_n = \frac{1}{n+1} \binom{2n}{n}
$$

### Catalan 数递推关系

$$
C_n = \sum_{k=1}^{n} C_{k-1} C_{n-k}
$$

## 拟 Catalan 数

$$
C_n^{*} = n! C_{n-1}
$$

## 乘法方案

### 固定顺序

$$
g_n = C_{n-1}
$$

### 任意顺序

$$
h_n = n! g_n = C_n^{*}
$$

## 组合数求和

$$
\sum_{k=0}^{n} \binom{k}{m} = \binom{n+1}{m+1}
$$

## 差分表序列通项

$c_0, c_1, c_2, \cdots, c_p$是第 0 条对角线，

$$
h_n = c_0 \binom{n}{0} + c_1 \binom{n}{1} + \cdots + c_p \binom{n}{p}
$$

## 第二类 Stirling 数

1. $S(p, 0) = 0, p \ge 1$
2. $S(p, p) = 1, p \ge 0$
3. $S(p, k) = kS(p-1, k) + S(p-1, k-1)$

### 第二类 Stirling 数的组合推理

由定理 8.2.5 知$S(p, k)$是把 p 个元素集合划分到 k 个**不可区分**的盒子且没有空盒子的划分个数。

### 可区分的盒子

$$
S^{\sharp} (p, k) = k! S(p, k)
$$

### Bell 数

第 p 行的第二类 Stirling 数求和

$$
B_p = S(p, 0) + S(p, 1) + \cdots + S(p, p)
$$

## 排列数的新符号

$$
[n]_p = P(n, p) = n(n-1)(n-2)\cdots(n-(p+1))
$$

## 小 Schroder 数

### s 生成函数

$$
\sum_{n=1}^{\infty} s_n x^n = \frac{1}{4} (1+x - \sqrt{x^2-6x+1})
$$

## s 递推关系

$$
(n+2)s_{n+2} - 3(2n+1) s_{n+1} + (n-1) s_{n} = 0, s_1 =s_2 =1
$$

## 大 Schroder 数

### S 生成函数

$$
\sum_{k=0}^{\infty} R_n x^n = \frac{1}{2x} (-(x-1) - \sqrt{x^2-6x+1})
$$

### S 递推关系

$$
R_n = R_{n-1} + \sum_{k=1}^{n} R_{k-1} R_{n-k}, \quad R_0 = 1
$$

注意与 Catalan 数进行区分。

## 小 Schroder 数与大 Schroder 数的关系

$$
R_n = 2s_{n+1}
$$

## 泰勒展开

$$
\sqrt{x^2 -6x + 1} = 1 -3x - 4x^2 -12 x^3 -44 x^4 + \cdots
$$

## 写在最后的悄悄话

冷门的好像最后都没怎么用到，热点的一定要记熟。
