# 第8章 特殊计数序列

## EX1

>Let 2n (equally spaced) points on a circle be chosen. Show that the number of ways to join these points in pairs, so that the resulting n line segments do not intersect, equals the nth Catalan number $C_n$.

![EX1](https://raw.githubusercontent.com/furtherun/imgs/main/img/C8EX1.png)

记该问题的解为$h_n$，选择一端固定在1上的线段为基线，另一端指向2k，圆上的2n个点被分为两组，一组有2k-2个，另一组有2n-2k个，同时问题$h_n$被划分为$h_{k-1}$和$h_{n-k}$。所以有，

$$
h_n = \sum_{k=1}h_{k-1}h_{n-k}, \quad n \ge 1, h_0 = h_1 = 1
$$

显然$h_n$与卡特兰数$C_n$有相同的递推关系和初始项，因此，

$$
h_n = \frac{1}{n+1} \binom{2n}{n}
$$

### EX1注

本题与第7章EX41是类似的问题

## EX2

> Prove that the number of 2-by-n arrays
> $$
> \left[
> \begin{matrix}
> x_{11} & x_{12} & \cdots & x_{1n} \\
> x_{21} & x_{22} & \cdots & x_{2n} \\
> \end{matrix}
> \right]
> $$
> that can be made from the numbers 1,2, ..., 2n such that
>
> $$
> x_{11} \le x_{12} \le \cdots \le x_{1n} \\
> x_{21} \le x_{22} \le \cdots \le x_{2n} \\
> $$
>
> $$
> x_{11} \le x_{21}, x_{12} x_{22}, ..., x_{1n} \le x_{2n}
> $$
>
> equals the $n$th Catalan number, $C_n$.

将数组第一行的元素标记为+1，第二行元素标记为-1。
问题可以转化为：将+1和-1按照从左到右的顺序排列，并且保证第i个+1在第i个-1前面，即$x_{1i} \le x_{2i}$（$1\le i \le n$）。

这与前k项和满足

$$
a_1 + a_2 + \cdots + a_k \ge 0
$$

等价，该问题与卡特兰数的组合意义相同，解即为第n个卡特兰数。

## EX3

>Write out all of the multiplication schemes for four numbers and the triangularization of a convex polygonal region of five sides corresponding to them.

考虑固定顺序的乘法，因此一共有$C_{n-1} = C_{3} = \frac{1}{4} \binom{6}{3} = 5$种方案，与之对应的三角形划分如图所示。

![EX3](https://raw.githubusercontent.com/furtherun/imgs/main/img/C8EX3.png)

## EX4

>Determine the triangularization of a convex polygonal region corresponding to the following multiplication schemes:
>
> (a) $(a_1 \times (((a_2 \times a_3) \times (a_4 \times a_5)) \times a_6))$
>
> (b) $(((a_1 \times a_2)\times (a_3 \times (a_4 \times a_5))) \times((a_6 \times a_7) \times a_8))$

### EX4(a)

以EX4(a)为例，步骤同上一题，

![EX4](https://raw.githubusercontent.com/furtherun/imgs/main/img/C8EX4(a).png)

## EX5

加星题，略。

## EX6

> Let the sequence $h_0, h_1, ... , h_n, ...$ be defined by $h_n = 2n^2 - n + 3, (n  \ge 0)$. Determine the difference table, and find a formula for $\sum_{k=0}^{n} h_k$.

$h_n$是2次多项式，因此有$\Delta^3 h_n = 0$，

计算$h_0 =3, h_1 = 4, h_2 = 9$，一阶差分$\Delta^1 h_0 = 1, \Delta^1 h_1 = 5$, 二阶差分$\Delta^2 h_0 = 4$，即得到第0条对角线。

$$
\begin{array}{cccc}
 3 & 4  & 9  & \cdots \\
 1 & 5 & 9 & \cdots \\
 4 & 4  & 4  & \cdots \\
 0 & 0  & 0  & \cdots
\end{array}
$$

所以$h_n = 3 \binom{n}{0} + \binom{n}{1} + 4 \binom{n}{2}$，进而

$$
\begin{aligned}
   \sum_{k=0}^{n} h_k =& 3 \sum_{k=0}^{n} \binom{n}{0} + \sum_{k=0}^{n} \binom{n}{1} + 4 \sum_{k=0}^{n} \binom{n}{2} \\
   =& 3 \binom{n+1}{1} + \binom{n+1}{2} + 4 \binom{n+1}{3} \quad n \ge 0
\end{aligned}
$$

## EX7

> The general term $h_n$ of a sequence is a polynomial in n of degree 3. If the first four entries of the Oth row of its difference table are 1, -1, 3, 10, determine $h_n$ and a formula for $\sum_{k=0}^{n} h_k$·

由题意，$h_n$是3次多项式，那么$\Delta^4 h_n=0$，求出差分表第0条对角线，

$$
\begin{array}{ccccc}
 1 & -1  & 3  & 10 & \cdots \\
 -2 & 4 & 7 & \cdots \\
 6 & 3  &  \cdots \\
  -3 & \cdots \\
  0 & \cdots
\end{array}
$$

因此$h_n = \binom{n}{0} -2 \binom{n}{1} + 6 \binom{n}{3} -3 \binom{n}{4}$，进而

$$
\begin{aligned}
    \sum_{k=0}^{n} h_k =&  \sum_{k=0}^{n} \binom{n}{0}  -2 \sum_{k=0}^{n} \binom{n}{1} + 6 \sum_{k=0}^{n} \binom{n}{2} -3 \sum_{k=0}^{n} \binom{n}{4} \\
    =&  \binom{n+1}{1} -2 \binom{n+1}{2} + 6 \binom{n+1}{3} -3 \binom{n+1}{4} \quad n \ge 0k
\end{aligned}
$$

## EX8

>Find the sum of the fifth powers of the first n positive integers.

设$h_n = n^5$，那么它的六阶差分为0，求出差分表，

$$
\begin{array}{ccccc}
 0 & 1  & 32  &  243 & 1024 & 3125 \cdots \\
 1 & 31 & 211 & 781 & 2101 \cdots \\
 30& 180  & 570 & 1320 &  \cdots \\
  150 & 390 & 750 & \cdots \\
  240 & 360 & \cdots \\
  120 & \cdots \\
  0 & \cdots
\end{array}
$$

$$
k^5 = \binom{k}{1} + 30 \binom{k}{2} + 150 \binom{k}{3} + 240 \binom{k}{4} + 120 \binom{k}{5}
$$

$$
\begin{aligned}
   \sum_{k=1}^{n} k^5 =& \sum_{k=1}^{n} \binom{k}{1} + 30\sum_{k=1}^{n} \binom{k}{2} + 150 \sum_{k=0}^{n} \binom{k}{3} + 240 \sum_{k=0}^{n} \binom{k}{4} + 120 \sum_{k=0}^{n} \binom{k}{5} \\
   =& \binom{n+1}{2} + 30 \binom{n+1}{3} + 150 \binom{n+1}{4} + 240 \binom{n+1}{5} + 120 \binom{n+1}{6}
\end{aligned}
$$

## EX9

> Prove that the following formula holds for the kth-order differences of a sequence
> $h_0, h_1, \cdots, h_n, \cdots$:
> $$
> \Delta^k h_n = \sum_{j=0}^{k}(-1)^{k-j} \binom{k}{j} h_{n+j}
> $$

采用数学归纳法证明，当k=0时，有

$$
\Delta h_n = (-1)^0 \binom{0}{0} h_{0} = h_0
$$
成立，假设当$k=m$时结论成立，即有

$$
\Delta^m h_n = \sum_{j=0}^{m}(-1)^{m-j} \binom{m}{j} h_{n+j}
$$

当$k=m+1$时，

$$
\begin{aligned}
   \Delta^{m+1} h_n = & \Delta^{m} h_{n+1} - \Delta^{m} h_{n} \\
   =& \sum_{j=0}^{m} (-1)^{m-j} \binom{m}{j} h_{n+1+j} - \sum_{j=0}^{m} (-1)^{m-j} \binom{m}{j} h_{n+j} \\
   =& \sum_{j=1}^{m+1} (-1)^{m-j+1} \binom{m}{j-1} h_{n+j} - \sum_{j=0}^{m} (-1)^{m-j} \binom{m}{j} h_{n+j} \\
   =& (h_{n+(m+1)}- (-1)^{m}h_n) + \sum_{j=1}^{m} ((-1)^{m-j+1} \binom{m}{j-1} - (-1)^{m-j} \binom{m}{j}) h_{n+j} \\
   =& (-1)^{(m+1)-(m+1)} h_{n+(m+1)} + (-1)^{(m+1) - 0} h_{n + 0} + \sum_{j=1}^{m} ((-1)^{m+1-j} \binom{m}{j-1} + (-1)^{m+1-j} \binom{m}{j}) h_{n+j} \\
   =& (-1)^{(m+1)-(m+1)} h_{n+(m+1)} + (-1)^{(m+1) - 0} h_{n + 0} + \sum_{j=1}^{m} (-1)^{m+1-j}  \binom{m+1}{j}) h_{n+j} \\
   =& \sum_{j=0}^{m+1} (-1)^{m+1-j} \binom{m+1}{j} h_{n+j}
\end{aligned}
$$
综上，证毕。

## EX10

> If $h_n$ is a polynomial in n of degree m, prove that the constants $c_0, c_1, \cdots, c_m$ such that
> $$
> h_n = c_0 \binom{n}{0} + c_1 \binom{n}{1} + \cdots + c_m \binom{n}{m}
> $$
> are uniquely determined. (Cf. Theorem 8.2.2.)

本题主要证明**唯一性**，假设存在不同的序列，$\{c_i\}_{i=0}^{m}$和$\{d_i\}_{i=0}^{m}$使得存在i满足$c_i \neq d_i, 0 \le i \le m$，

$$
\begin{aligned}
  h_n =& c_0 \binom{n}{0} + c_1 \binom{n}{1} + \cdots + c_m \binom{n}{m} \\
  =& d_0 \binom{n}{0} + d_1 \binom{n}{1} + \cdots + d_m \binom{n}{m}
\end{aligned}
$$

$$
\sum_{k=0}^{m} (c_k - d_k) \binom{n}{k} = 0
$$

显然$\dbinom{n}{k} \gt 0$，那么只能是$c_k -d_k =0, 0 \le k \le m$，这与假设矛盾，因此假设不成立。

## EX11

>Compute the Stirling numbers of the second kind 8(8, k), (k = 0, 1, ..., 8).

第二类Stirling数的性质，

1. $S(p, 0) = 0$
2. $S(p, p) = 1$
3. $S(p, k) = kS(p-1, k) + S(p-1, k-1)$

进行打表，
| $k$       | 0   | 1   | 2   | 3   | 4    | 5    | 6   | 7   | 8   |
| ------- | --- | --- | --- | --- | ---- | ---- | --- | --- | --- |
| $S(8, k)$ | 0   | 1   | 127 | 966 | 1701 | 1050 | 266 | 28  | 1   |

### EX11 验证程序

```cpp
 #include <iostream>
#include <vector>

using namespace std;
int main() {
    auto stirList = vector<vector<int>>(10, vector<int>(10, 0));
    for(int p = 1; p < 10; ++ p) {
        stirList[p][p] = 1;
    } 
    for(int p = 2; p < 10; ++ p) {
        for(int k = 1; k < p; ++ k) {
            stirList[p][k] = stirList[p-1][k] * k + stirList[p-1][k-1];
        }
    }
    for(int p = 0; p < 10; ++ p) {
        for(int k = 0; k <= p; ++ k) {
            printf("%d\t", stirList[p][k]);
        }
        printf("\n");
    }
    
    printf("\n S(8, k), k = 0, 1, 2, ..., 8\n");
    for(int k = 0; k <= 8; ++ k) {
        printf("%d\t", stirList[8][k]);
    }
    return 0;
}
```

## EX12

> Prove that the Stirling numbers of the second kind satisfy the following relations:
> (a) $S(n, 1) = 1, \quad (n \ge 1)$
> (b) $S(n, 2) = 2^{n-1} -1, \quad (n \ge 2)$
> (c) $S(n, n-1) = \binom{n}{n}, \quad (n \ge 1)$
> (d) $S(n, n-2) = \binom{n}{3} + 3 \binom{n}{4} \quad (n \ge 2)$

### EX12(a)

由定理8.2.5知$S(p, k)$是把p个元素集合划分到k个不可区分的盒子且没有空盒子的划分个数。
因此，$S(p, 1)$是把p个元素划分到1个盒子且没有空盒子的划分个数，显然只有1种。

### EX12(b)

$$
S(p, p) = 1, S(p, 1) = 1
$$

$$ \begin{aligned}
    S(n, 2) = & 2S(n-1, 2) + S(n-1, 1) \\
    =& 2S(n-1, 2) + 1 \\
    =& 2(2S(n-2, 2) + S(n-2, 1)) + 1 \\
    =& 2^2 S(n-2, 2) + (1 + 2) \\
    =& 2^3 S(n-3, 2) + (1 + 2 + 2^2) \\
    =& \cdots \\
    =& 2^{n-2} S(n-(n-2), 2) + (1 + 2 + 2^2 + \cdots + 2^{n-3}) \\
    =& \frac{1-2^{n-1}}{1-2} \\
    =& 2^{n-1} - 1
\end{aligned}
$$

### EX12(c)

使用数学归纳法证明，当n=1时，$S(1, 0) = 0 = \binom{1}{2}$，显然成立。假设当$n=k$时有$S(k,k-1) = \binom{k}{2}$，当$n=k+1$时有，

$$
\begin{aligned}
    S(k+1, k) =& kS(k, k) + S(k, k-1) \\
    = k + \binom{k}{2} \\
    = k + \frac{k(k-1)}{2} \\
    = \frac{k(k+1)}{2} \\
    = \binom{k+1}{2}
\end{aligned}
$$

综上，证毕。

### EX12(d)

考虑问题：将n个元素划分到n-2个不可区分的盒子且没有空盒子的个数S(n, n-2)。

如果有一个盒子中有三个元素，有$\binom{n}{3}$种情况；如果有两个盒子各有两个元素，先从n个元素中选出2个，再从剩余n-2个元素中选出2个，两种情况对称，因此是$\displaystyle \frac{\binom{n}{2}\binom{n-2}{2}}{2!} = 3\binom{n}{4}$。

因此有$S(n, n-2) = \displaystyle \binom{n}{3} + 3\binom{n}{4}$。

## EX13

> Let X be a p-element set and let Y be a k-element set. Prove that the number of functions $f : X \rightarrow Y$ which map X onto Y equals
> $$
> k! S(p, k) = S^{\#}(p, k)
> $$

X映射到Y是满射，映射函数等价于把p个元素放入到k个**可区分**的盒子中，即有$S^{\#}(p, k)$个；同时由可区分盒子与不可区分盒子划分的关系，有$S^{\#}(p, k) = k!S(p, k)$，因此映射函数的个数也等于$k!S(p, k)$。

### EX13吐槽

**到上函数**是什么鬼？没想到**onto**竟然是满射的意思，学到了。

## EX14

加星题，略。

## EX15

> The number of partitions of a set of n elements into k **distinguishable** boxes (some of which may be empty) is $k_n$. By counting in a different way, prove that
> $$
> k^n = \binom{k}{1} 1! S(n, 1) + \binom{k}{2} 2! S(n, 2) + \cdots + \binom{k}{n} n! S(n, n)
> $$
> If $k \ge n$, define $S(n, k)$ to be 0.

方法一：考虑把n个元素分别放在k个盒子中，每个元素有k种放置放法，因此共$k^n$种方法。

方法二：先区分盒子是否非空，从k个盒子中选出i个非空盒子，问题变为把n个元素放入i个可区分盒子且盒子非空中的方法数，即为$S^{\#}(n, i)$，i可能的取值为$i=1,2, \cdots, k$，

$$
\sum_{i=1}^{k} \binom{k}{i} S^{\#} (n, i) = \sum_{i=1}^{k} \binom{k}{i} i! S(n, i)
$$

方法一和方法二是同一问题的两种解决方法，因此等价，所以有，

$$
k^n = \binom{k}{1} 1! S(n, 1) + \binom{k}{2} 2! S(n, 2) + \cdots + \binom{k}{n} n! S(n, n)
$$

### EX15注

本题中文书中有翻译错误，把可区分写成了不可区分。
EX13应该也是翻译错误（onto）。

## EX16

> Compute the Bell number $B_8$. (Cf. Exercise 11.)

Bell数$B_p$是第p行的第二类Stirling数$S(p, k)$之和。

$$
0+1+127+966+1701+1050+266+28+1=4140
$$

### EX16验证程序

```cpp
#include <iostream>
#include <vector>

using namespace std;
int main() {
    auto stirList = vector<vector<int>>(10, vector<int>(10, 0));
    for(int p = 1; p < 10; ++ p) {
        stirList[p][p] = 1;
    } 
    for(int p = 2; p < 10; ++ p) {
        for(int k = 1; k < p; ++ k) {
            stirList[p][k] = stirList[p-1][k] * k + stirList[p-1][k-1];
        }
    }
    for(int p = 0; p < 10; ++ p) {
        for(int k = 0; k <= p; ++ k) {
            printf("%d\t", stirList[p][k]);
        }
        printf("\n");
    }
    
    printf("\n S(8, k), k = 0, 1, 2, ..., 8\n");
    int bellNum = 0;
    for(int k = 0; k <= 8; ++ k) {
        printf("%d\t", stirList[8][k]);
        bellNum += stirList[8][k];
    }
    printf("\n Bell number B8 is %d\n", bellNum);
    return 0;
}
```

## EX17

> Compute the triangle of Stirling numbers of the first kind s(n, k) up to n = 7.

第一类Stirling数的递推关系为，

$$
s(p, k) = (p-1) s(p-1, k) + s(p-1, k-1)
$$

初始条件与第二类Stirling数相同，$s(p, p) = 1, s(p, 0) = 0, p \ge 1, s(0, 0) = 1$。

### EX17验证程序

```cpp
#include <iostream>
#include <vector>

using namespace std;
int main() {
    auto firstStirList = vector<vector<int>>(10, vector<int>(10, 0));
    for(int p = 1; p < 10; ++ p) {
        firstStirList[p][p] = 1;
    } 
    for(int p = 2; p < 10; ++ p) {
        for(int k = 1; k < p; ++ k) {
            firstStirList[p][k] = firstStirList[p-1][k] * (p-1) 
                                + firstStirList[p-1][k-1];
        }
    }
    for(int p = 0; p < 10; ++ p) {
        for(int k = 0; k <= p; ++ k) {
            printf("%d\t", firstStirList[p][k]);
        }
        printf("\n");
    }
    
    printf("\n s(7, k), k = 0, 1, 2, ..., 7\n");
    for(int k = 0; k <= 7; ++ k) {
        printf("%d\t", firstStirList[7][k]);
    }
    return 0;
}
```

## EX18

> Write $[n]_k$ as a polynomial in n for k = 5,6, and 7. 

由定义可以求出$[n]_5$，

$$
\begin{aligned}
   [n]_5 =& n(n-1)(n-2)(n-3)(n-4) \\
   =& n^5-10n^4+35n^3-50n^2+24n
\end{aligned}
$$

也可以通过查表写$[n]_7$，

$$
\begin{aligned}
[n]_7 = & \sum_{k=0}^{7}(-1)^{7-k}s(7,k) n^k \\
=& n^7 - 21 n^6 + 175 n^5 - 735 n^4 + 1624 n^3 - 1764 n^2 + 720 n
\end{aligned}
$$

## EX19

> Prove that the Stirling numbers of the first kind satisfy the following formulas: 
> 
> (a) $a(n, 1) = (n-1) !, \quad (n \ge 1)$
> 
> (b) $s(n, n-1) = \binom{n}{2}, \quad (n \ge 1)$

结合递归式，易证。

## EX20

> VerifY that $[n]_n$ = n!, and write n! as a polynomial in n using the Stirling numbers of the first kind. Do this explicitly for n = 6. 