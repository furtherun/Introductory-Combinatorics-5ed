# 第 6 章 容斥原理及应用

## 错位排序的一些结论

### 递推公式

$$
D_n = nD_{n-1} + (-1)^n, \quad D_n = (n-1)(D_{n-2} + D_{n-1})
$$

### 常数

可以使用上面的递推公式求出来错位排序常用的一些数值，$D_1 = 0, D_2 = 1, D_3 = 2, D_4 = 9, D_5 = 44, D_6 = 265, D_7= 1854$。

:::details 验算代码

```cpp
#include <iostream>

using namespace std;

int main()
{
    int p = 0, q = 1;
    int n;
    scanf("%d", &n);

    for(int i = 3; i <= n; ++ i) {
        int tmp = (i-1)*(p+q);
        printf("D%d = %d\n", i, tmp);
        p = q;
        q = tmp;
    }
    return 0;
}
```

:::

## EX1

> Find the number of integers between 1 and 10,000 inclusive that are not divisible by 4,5, or 6.

本题写的详细些，后面类似的题目就不再解释太多细节。

设$A_i, i=1,2,3$分别为 1 到 10，000 之间能被 4、5 和 6 整除的个数。

计算集合大小时采用**向下取整**，例如$\lfloor \dfrac{10000}{6}  \rfloor = 1666$，表明还取不到下一个 6 的倍数。

$A_1 \cap A_3$表示既是 4 的倍数，也是 6 的倍数，4 和 6 的最小公倍数是 12，即能被 12 整除的数。

|           set           | size  |
| :---------------------: | :---: |
|          $A_1$          | 2500  |
|          $A_2$          | 2000  |
|          $A_3$          | 1666  |
|     $A_1 \cap A_2$      |  500  |
|     $A_1 \cap A_3$      |  833  |
|     $A_2 \cap A_3$      |  333  |
| $A_1 \cap A_2 \cap A_3$ |  166  |

$$
\begin{aligned}
    |\overline{A_1} \cap \overline{A_2} \cap \overline{A_3}| =& |S| - \sum |A_i| + \sum |A_iA_j| - \sum|A_iA_jA_k| \\
    =& 10000 - (2500+2000 + 1666) +(500+833 + 333) - 166 \\
    =& 5334
\end{aligned}
$$

## EX2

> Find the number of integers between 1 and 10,000 inclusive that are not divisible by 4, 6, 7, or 10.

:::details 验证代码

```cpp
#include <iostream>
#include <vector>

using namespace std;

int main()
{
    int cnt = 0;
    vector<int> arr{4, 6, 7, 10};
    for(int i = 1; i <= 10000; ++ i) {
        bool flag = true;
        for(auto item: arr) {
            if(i%item == 0) {
                flag = false;
                break;
            }
        }
        if(flag) {
            printf("%d ", i);
            cnt ++;
            if(cnt % 20 == 0) printf("\n");
        }
    }
    printf("\nTotal number = %d\n", cnt);
    return 0;
}
```

:::

## EX3

> Find the number of integers between 1 and 10,000 that are neither perfect squares nor perfect cubes.

**既是完全平方数也是完全立方数的数一定能拆分成 6 个相同数的乘积。**

计算满足$x^2 \le 10000, \quad y^3 \le 10000, \quad z^6 \le 10000$的最大整数解，得$x=100, y = 21, z = 4$。

|      set       | size  |
| :------------: | :---: |
|     $A_1$      |  100  |
|     $A_2$      |  21   |
| $A_1 \cap A_2$ |   4   |

$$
\begin{aligned}
    |\overline{A_1} \cap \overline{A_2} | =& |S| - \sum |A_i| + \sum |A_iA_j|\\
    =& 10000 - (100+21) + 4 \\
    =& 9883
\end{aligned}
$$

## EX4

> Determine the number of 12-combinations of the multiset
>
> $$
> S = \{4 \cdot a, 3 \cdot b, 4 \cdot c, 5 \cdot d\}
> $$

多重集合的组合与方程的非负整数解个数等价，因此满足

$$
0 \le x_1 \le 4, 0 \le x_2 \le 3, 0 \le x_3 \le 4, 0 \le x_4 \le 5
$$

的方程

$$
x_1 + x_2 + x_3 + x_4 = 12
$$

设$A_i, i = 1,2,3,4$分别是满足$x_1 \ge 5, x_2 \ge 4, x_3 \ge 5, x_4 \ge 6$的解组成的集合。

求满足$x_1 \ge 5$的解，进行变量代换$y_1 = x_1 - 5, y_2 = x_2, y_3 = x_3 , y_4 = x_4$，方程转化为

$$
y_1 + y_2 + y_3 + y_4 = 7
$$

此时方程的解个数为$\dbinom{7+4-1}{7} = 120$，即$|A_1| = 120$。
同理可以计算$|A_2| = 165, |A_3| = 120, |A_4| = 84$。

求满足$x_1 \ge 5, x_2 \ge 4$的解，进行变量代换$y_1 = x_1 - 5, y_2 = x_2-4, y_3 = x_3 , y_4 = x_4$，方程转化为

$$
y_1 + y_2 + y_3 + y_4 = 3
$$

此时方程的解个数为$\dbinom{3+4-1}{3} = 20$，即$|A_1 \cap A_2 | = 20$。

因此可以求出

|               set                | size  |
| :------------------------------: | :---: |
|              $A_1$               |  120  |
|              $A_2$               |  165  |
|              $A_3$               |  120  |
|              $A_4$               |  84   |
|          $A_1 \cap A_2$          |  20   |
|          $A_1 \cap A_3$          |  10   |
|          $A_1 \cap A_4$          |   4   |
|          $A_2 \cap A_3$          |  20   |
|          $A_2 \cap A_4$          |  10   |
|          $A_3 \cap A_4$          |   4   |
|     $A_1 \cap A_2 \cap A_3$      |   0   |
|     $A_1 \cap A_2 \cap A_4$      |   0   |
|     $A_1 \cap A_3 \cap A_4$      |   0   |
|     $A_2 \cap A_3 \cap A_4$      |   0   |
| $A_1 \cap A_2 \cap A_3 \cap A_4$ |   0   |

$$
\begin{aligned}
    |\overline{A_1} \cap \overline{A_2} \cap \overline{A_3} \cap \overline{A_4} | =& |S| - \sum |A_i| + \sum |A_iA_j| - \sum|A_iA_jA_k| + \sum|A_iA_jA_kA_u| \\
    =& 455 - (120 + 165 + 120 + 84) + (20 + 10 + 4 + 20 + 10 + 4) \\
    =& 34
\end{aligned}
$$

## EX5

> Determine the number of 10-conbiations of the multiset
>
> $$
> S = \{\infty \cdot a, 4\cdot b, 5\cdot c, 7 \cdot d\}
> $$

本题和上一题的区别就在于$x_1$没有上界，不需要考虑$x_1$上界的补集。
定义$A_1, A_2, A_3$分别表示$x_2 \ge 5, x_3 \ge 6, x_4 \ge 8$。

|           set           |       size        |
| :---------------------: | :---------------: |
|          $A_1$          | $\binom{8}{3}=56$ |
|          $A_2$          | $\binom{7}{3}=35$ |
|          $A_3$          | $\binom{5}{3}=10$ |
|     $A_1 \cap A_2$      |         0         |
|     $A_1 \cap A_3$      |         0         |
|     $A_2 \cap A_3$      |         0         |
| $A_1 \cap A_2 \cap A_3$ |         0         |

$$
\begin{aligned}
    |\overline{A_1} \cap \overline{A_2} \cap \overline{A_3}  | =& |S| - \sum |A_i| + \sum |A_iA_j| - \sum|A_iA_jA_k| \\
    =& 286-(56+35+10) \\
    =& 185
\end{aligned}
$$

## EX6

> A bakery sells chocolate, cinnamon, and plain doughnuts and at a particular time has 6 chocolate, 6 cinnamon, and 3 plain. If a box contains 12 doughnuts, how many different options are there for a box of oughnuts?

该问题可以转化为方程

$$
x_1 + x_2 + x_3 = 12
$$

在$0 \le x_1 \le 6, 0 \le x_2 \le 6, 0\le x_3 \le 3$的条件下整数解的个数。

定义$A_1, A_2, A_3$分别表示$x_1 \ge 7, x_2 \ge 7, x_3 \ge 4$。

|           set           |        size        |
| :---------------------: | :----------------: |
|          $A_1$          | $\binom{7}{2}=21$  |
|          $A_2$          | $\binom{7}{2}=21$  |
|          $A_3$          | $\binom{10}{2}=45$ |
|     $A_1 \cap A_2$      |         0          |
|     $A_1 \cap A_3$      | $\binom{3}{2}$ = 3 |
|     $A_2 \cap A_3$      |  $\binom{3}{2}=3$  |
| $A_1 \cap A_2 \cap A_3$ |         0          |

$$
\begin{aligned}
    |\overline{A_1} \cap \overline{A_2} \cap \overline{A_3}  | =& |S| - \sum |A_i| + \sum |A_iA_j| - \sum|A_iA_jA_k|  \\
    =& \binom{12+2}{2} - (21+21+45) + (3 + 3) \\
    =& 91 -  (21+21+45) + (3 + 3) \\
    =& 10
\end{aligned}
$$

## EX7

> Determine the number of solutions of the equation $x_1 + x_2 + x_3 + x_4 = 14$ in nonnegative integers $x_1, x_2, x_3$, and $x_4$ not exceeding 8.

本题可以利用对称性减少计算，

$$
\begin{aligned}
    |\overline{A_1} \cap \overline{A_2} \cap \overline{A_3} \cap \overline{A_4} | =& \binom{17}{3} - 4\binom{8}{3} \\
    =& 680 - 4 \times 56 \\
    =& 456
\end{aligned}
$$

## EX8

> Determine the number of solutions of the equation $x_1 + x_2 + x_3 + x_4 + x_5 = 14$ in positive integers $x_1, x_2, x_3, x_4$, and $x_5$ not exceeding 5.

类似上一题，不过本题强调**正**（**positive**）整数，取值范围因此是$1 \le x_i \le 5$，先平移变成$0 \le y_i \le 4$，求解方程$\sum y_i = 9$。

$$
\begin{aligned}
|\overline{A_1} \cap \overline{A_2} \cap \overline{A_3} \cap \overline{A_4}  \cap \overline{A_5}| =& \binom{13}{4} - 5\binom{8}{4} + \binom{5}{2} \binom{3}{4}\\
=& 715 - 5 \times 70 + 10 \times 0\\
=& 365
\end{aligned}
$$

## EX9 :ghost:

> Determine the number of integral solutions of the equation
>
> $$
> x_1 + x_2 + x_3 + x_4 = 20
> $$
>
> that satisfy
>
> $$
> 1 \le x_1 \le 6, 0 \le x_2 \le 7, 4\le x_3 \le 8, 2 \le x_4 \le 6
> $$
>

过程略，答案 96。

## EX10

> Let S be a multiset with k distinct objects with given repetition numbers $n_l, n_2, ... ,n_k$, respectively. Let r be a positive integer such that there is at least one r-combination of S. Show that, in applying the inclusion-exclusion principle to determine the number of r-combinations of S, one has $A_1 \cap A_2 \cap ... \cap A_k = \emptyset$.

多重集合 r 组合问题转化为方程$\displaystyle \sum_{i=0}^{k} x_i = r, 0 \le x_i \le n_i$的整数解问题。

假设存在一组解，因此有$r \le \displaystyle \sum_{i=0}^k n_i$，记$A_i$为满足$x_i \gt n_i$的集合。

当$A_1 \cap A_2 \cap ... \cap A_k \neq \emptyset$，即存在$r = \displaystyle \sum_{i=0}^{k} x_i \gt \displaystyle \sum_{i=0}^{k} n_i  \ge r$，产生矛盾，所以$A_1 \cap A_2 \cap ... \cap A_k = \emptyset$。

> [!CAUTION]
> 本题的奇怪之处就在于题目没告诉这些$A_1$、$A_2$等究竟是什么，这是参考答案中**突然**定义的。

## EX11

> Determine the number of permutations of {1, 2, ... ,8} in which no even integer is in its natural position.

$$
\begin{aligned}
    |\overline{A_1} \cap \overline{A_2} \cap \overline{A_3} \cap \overline{A_4} | =& 8!-4\times 7! + \binom{4}{2}\times 6! + \binom{4}{3}\times 5! + 4!\\
    =& 715 - 5 \times 70 + 10 \times 0\\
    =& 24024
\end{aligned}
$$

## EX12

> Determine the number of permutations of {1, 2, ... ,8} in which exactly four integers are in their natural positions.

选出 4 个数放入自然位置，剩余 4 个数进行错位排序。

$$
D_4 = 4! (1-\frac{1}{1!} + \frac{1}{2!} - \frac{1}{3!} + \frac{1}{4!}) = 9
$$

因此总排列数为，

$$
\binom{8}{4} \times D_4 = 70 \times 9 = 630
$$

<!-- ### EX12 注 -->

:::tip
n 元素错位排序可以直接使用公式，

$$
D_n = n! (1 - \frac{1}{1!} + \frac{1}{2!} - \frac{1}{3!} + \cdots + (-1)^{n} \frac{1}{n!})
$$
:::

## EX13

> Determine the number of permutations of {1, 2, ... ,9} in which at least one odd integer is in its natural position.

设$A_i$表示 i 在自然位置上，

|                    set                    | size  |
| :---------------------------------------: | :---: |
|                   $A_i$                   | $8!$  |
|              $A_i \cap A_j$               | $7!$  |
|          $A_i \cap A_j \cap A_k$          | $6!$  |
|     $A_i \cap A_j \cap A_k \cap A_u$      | $5!$  |
| $A_i \cap A_j \cap A_k \cap A_u \cap A_v$ | $4!$  |

$$
\begin{aligned}
    |A_1 \cup A_3 \cup A_5 \cup A_7 \cup A_9| =& S-|\overline{A_1} \cap \overline{A_3} \cap \overline{A_5} \cap \overline{A_7} \cap \overline{A_9} |\\
    =& 5\times 8! - \binom{5}{2} \times 7! + \binom{5}{3} \times 6! - 5 \times 5! + 4! \\
    =& 157824
\end{aligned}
$$

:::tip

本题考查定理 6.1.2（正文 p102）**至少具有性质**的计数。大多数题目还是考察定理 6.1.1 **不具有性质**的容斥原理。
:::

## EX14

> Determine a general formula for the number of permutations of the set {1, 2, ... , n} in which exactly k integers are in their natural positions.

选 k 个放到自然位置，其余 n-k 个进行错位排序。

$$
\binom{n}{k} D_{n-k}
$$

## EX15

> At a party, seven gentlemen check their hats. In how many ways can their hats be returned so that
> (a) no gentleman receives his own hat?
> (b) at least one of the gentlemen receives his own hat?
> (c) at least two of the gentlemen receive their own hats?

### EX15Q(a)

进行错位排序，$D_7 = 1854$。

### EX15Q(b)

全排序减去错位排序（没有人在自然位置），即至少有一个在自然位置。$7! - D_7 = 3186$。

### EX15Q(c)

从上一问的结果（至少有一人在自然位置）中减去恰有一人在自然位置的情况，即至少有两人在自然位置，$3186 - 7 D_6 = 3186-7\times 265 = 1331$。

## EX16

> Use combinatorial reasoning to derive the identity
>
> $$
> n! = \binom{n}{0}D_0 + \binom{n}{1}D_{n-1} + \binom{n}{2} D_{n-2} + \cdots + \binom{n}{n-1}D_1 + \binom{n}{n}D_0
> $$
>
> (Here,$D_0$ is defined to be 1.)

记$S$为$\{1,2, \cdots , n\}$的全排列集合，
$S_i$表示恰有 i 个元素在自然位置的排序，显然$\{S_i\}$划分了$S$，
因此$|S| = \sum_{i=0}^{n}|S_i|$。

全排列$|S| = n!$，
恰有 i 个自然位置的错位排序（参考 EX14），
有$\binom{n}{i}D_{n-i}$个，因此等式成立。

<!-- ### EX16 评注 -->

> [!NOTE]
> 本题定义了$D_0=1$，而本身的错位排序$D_1=0$。

## EX17

> Determine the number of permutations of the multiset
>
> $$
> S = \{3\cdot a, 4 \cdot b, 2 \cdot c\}
> $$
>
> where, for each type of letter, the letters of the same type do not appear consecutively.
> (Thus *abbbbcaca* is not allowed, but *abbbacacb* is.)

设$A_i, i = 1, 2, 3$分别表示出现了*aaa*、*bbbb*和*cc*，$A_1$可以当作${aaa, b, b, b, b, c, c}$的排列，即$\binom{7}{1 \; 4\; 2} = 105$。

|           set           |              size              |
| :---------------------: | :----------------------------: |
|          $A_1$          |              105               |
|          $A_2$          | $\binom{6}{3 \; 1 \; 2} = 60$  |
|          $A_3$          | $\binom{8}{3 \; 4 \; 1} = 280$ |
|     $A_1 \cap A_2$      |  $\binom{4}{1 \;1\; 2} = 12$   |
|     $A_1 \cap A_3$      |   $\binom{6}{1 \;4\;1} = 30$   |
|     $A_2 \cap A_3$      |   $\binom{5}{3\;1\;1} = 20$    |
| $A_1 \cap A_2 \cap A_3$ |  $\binom{3}{1\;1\;1} = 3!=6$   |

$$
\begin{aligned}
    |\overline{A_1} \cap \overline{A_2} \cap \overline{A_3}| =& |S| - \sum |A_i| + \sum |A_iA_j| - \sum|A_iA_jA_k| \\
    =& 1260 - (105+60+280) +(12+30+20) - 6 \\
    =& 871
\end{aligned}
$$

<!-- ### EX17 注 -->

:::tip
本题是求的**多重集合排序**问题和上面的多重集合组合问题进行区分。
:::

## EX18

> Verify the factorial formula
>
> $$
> n! = (n-1)((n-2)! + (n-1)!), \qquad (n=2,3,4, ...).
> $$
>

没太看懂这题想干什么，难道是数学归纳法？

## EX19

> Using the evaluation of the derangement numbers as given in Theorem 6.3.1, provide a proof of the relation
>
> $$
> D_n = (n-1)(D_{n-2} + D_{n-1}), \quad (n=3,4,5, ...).
> $$
>

展开合并同类项即可，

$$
D_{n-2} = (n-2)! \sum_{i=0}^{n-2} \frac{(-1)^{i}}{i!}
$$

将$D_{n-1}$拆分为能与$D_{n-2}$同类相加的两项，

$$
\begin{aligned}
    D_{n-1} = & (n-1)! \sum_{i=0}^{n-1} \frac{(-1)^i}{i!} \\
    =& (n-1)\cdot (n-2)! (\sum_{i=0}^{n-2} \frac{(-1)^i}{i!} + \frac{(-1)^{n-1}}{(n-1)!}) \\
    =&(n-1) \cdot (n-2)! \sum_{i=0}^{n-2} \frac{(-1)^i}{i!} + (-1)^{n-1}
\end{aligned}
$$

将$D_{n-1}$与$D_{n-2}$求和，

$$
    D_{n-1} + D_{n-2} = n \cdot (n-2)! \sum_{i=0}^{n-2} \frac{(-1)^i}{i!} + (-1)^{n-1}
$$

$$
(n-1) (D_{n-1} + D_{n-2}) = n! \sum_{i=0}^{n-2} \frac{(-1)^i}{i!} + (-1)^{n-1}(n-1)
$$

将$D_n$拆分为上述形式，

$$
\begin{aligned}
    D_n =& n!  \sum_{i=0}^{n} \frac{(-1)^i}{i!} \\
    =&  n! \sum_{i=0}^{n-2} \frac{(-1)^i}{i!} + n! (\frac{(-1)^{n-1}}{(n-1)!} + \frac{(-1)^n}{n!}) \\
    =&  n! \sum_{i=0}^{n-2} \frac{(-1)^i}{i!} + (-1)^{n-1}n + (-1)^n \\
    =& (n-1) (D_{n-1} + D_{n-2})
\end{aligned}
$$

综上，等式成立。

## EX20

> Starting from the formula Dn = nDn- 1 + (_l)n, (n = 2,3,4, ... ), give a proof of Theorem 6.3.1.

使用数学归纳法证明，当$n \ge 1$时，总有

$$
D_{n} =  n! \sum_{i=0}^{n} \frac{(-1)^i}{i!}
$$

当 n=1 时，1 只能放在自然位置，没有错位排序，所以错位排序数为 0，且$D_1 = 1! \times (1 - 1) = 0$成立。

当$n \ge 2$时，假设等式成立，对于 n+1 有

$$
\begin{aligned}
    D_{n+1} = & (n+1) D_{n} + (-1)^{n+1} \\
    =& (n+1) \times n! \sum_{i=0}^{n} \frac{(-1)^i}{i!} + (-1)^{n+1} \\
    =& (n+1)! \sum_{i=0}^{n} \frac{(-1)^i}{i!} + (n+1)! \times \frac{(-1)^{n+1}}{(n+1)!} \\
    =& (n+1)! \sum_{i=0}^{n+1} \frac{(-1)^i}{i!}
\end{aligned}
$$

符合等式，综上证毕。

## EX21

> Prove that $D_n$ is an even number if and only if n is an odd number.

语句 p：n 为奇数；语句 q：$D_n$为偶数。
原题目可以转化为证明如下两个命题：若 p 成立，则 q 也成立；若 q 成立，则 p 也成立。

我们先考虑命题二，对于命题二我们验证它的「逆否命题」，若$\neg q$成立，则$\neg p$也成立。
命题转化为，n 为偶数时，$D_n$为奇数。

观察式子$D_n = n D_{n-1} + (-1)^n$，当 n 为偶数时，$nD_{n-1}$项为偶数，$(-1)^n = 1$，显然$D_n$为奇数，命题二的逆否命题为真，命题二也为真。

对于命题一，我们采用数学归纳法证明。当 n 为奇数时，
并且当 n=1 时，有$D_1 = 0$，显然成立；

当 n=2k+1($\ge 1$) 时，设$D_{2k+1}$为偶数；那么当$n=2k+3$时，$D_{2k+3} = (2k+3)D_{2k+2} + (-1)^{(2k+3)} = (2k+3)D_{2k+2} - 1$，由命题二的逆否命题可知$D_{2k+2}$一定为奇数，进而两个奇数的乘积$(2k+3)D_{2k+2}$也为奇数，减一后为偶数。

综上，当 n 为奇数时，命题得证。

因为命题一和命题二均为真，因此可以说，$D_n$是偶数当且仅当 n 是奇数。

<!-- ### EX21 吐槽 -->

:::info 简评
颇有点压轴题的感觉，证明**若 n 为奇数，则$D_n$为偶数**这个命题前，
需要先证明**若 n 为偶数，则$D_n$为奇数**。
如果有前一问的引导，难度会小一些；若是直接跳跃性地构造最后一问，难度就大很多。
:::

## EX22

> Show that the numbers $Q_n$ of Section 6.5 can be rewritten in the form
>
> $$
> Q_n = (n-1)! (n- \frac{n-1}{1!} + \frac{n-2}{2}  - \frac{n-3}{3!} + \cdots + \frac{(-1)^{n-1}}{(n-1)!})
> $$

对$Q_n$定义的变形，

$$
\begin{aligned}
    Q_n = & n! - \binom{n-1}{1}(n-1)! + \binom{n-1}{2}(n-2)! + \cdots + (-1)^{n-1} \binom{n-1}{n-1} 1! \\
    =& \sum_{k=0}^{n-1}\binom{n-1}{k} (-1)^k (n-k)! \\
    =& \sum_{k=0}^{n-1} \frac{(n-1)!}{k! \cdot (n-k-1)!} \cdot (-1)^k \cdot (n-k)! \\
    =& (n-1)! \sum_{k=0}^{n-1} (-1)^k \frac{n-k}{k!} \\
    =& (n-1)! (\frac{n-0}{0!} - \frac{n-1}{1!} + \frac{n-2}{2!} + \cdots + (-1)^{n-1}\frac{n-(n-1)}{(n-1)!}) \\
    =& (n-1)! (n- \frac{n-1}{1!} + \frac{n-2}{2}  - \frac{n-3}{3!} + \cdots + \frac{(-1)^{n-1}}{(n-1)!})
\end{aligned}
$$

综上，证毕。

## EX23

> (Continuation of Exercise 22.) Use the identity
>
> $$
> (-1)^k \frac{n-k}{k!} = (-1)^k \frac{n}{k!} + (-1)^{k-1} \frac{1}{(k-1)!}
> $$
>
> to prove that $Q_n = D_n + D_{n-1}, (n=2,3, ...)$.

$$
\begin{aligned}
    Q_n =& (n-1)! \sum_{k=0}^{n-1} (-1)^k \frac{n-k}{k!} \\
    =& (n-1)! \sum_{k=0}^{n-1}((-1)^k \frac{n}{k!} + (-1)^{k-1} \frac{1}{(k-1)!})  \\
    =& nD_{n-1} + (n-1)! \sum_{k=1}^{n-1} \frac{(-1)^{k-1}}{(k-1)!} \\
    =& nD_{n-1} + (n-1)! \sum_{i=0}^{n-2} \frac{(-1)^{i}}{(i)!} \\
    =& nD_{n-1} + (n-1)D_{n-2} \\
    =& D_{n-1} + (n-1)(D_{n-1} + D_{n-2}) , \quad \text{for } D_{n} = (n-1)(D_{n-1} +D_{n-2}) \\
    =& D_n + D_{n-1}
\end{aligned}
$$

<!-- ### EX23 注 -->

:::tip
该解法需要使用$D_n = (n-1)(D_{n-1} + D_{n-2})$的化简技巧，
答案的则是巧妙地添加了一个为 0 的项$(-1)^n \dfrac{n-n}{n!}$，进而，

$$
Q_{n} = (n-1)! \sum_{k=0}^n (-1)^k \frac{n-k}{k!}
$$

在之后的展开项中则分别是$D_n, D_{n-1}$的定义形式。
:::

## EX24

> What is the number of ways to place six nonattacking rooks on the 6-by-6 boards with forbidden positions as shown?
> ![EX24](imgs/c6ex24.png)

设$r_k$为在 k 个禁止位上摆放棋子的方法数，

### EX24 Q(a)

显然，$r_0 =1, r_1 = 6$，禁止位置的集合可以划分为 3 个独立的部分，每一部分最多只能放置一辆车。

因此，$r_2 = \dbinom{3}{2} \times 2^2 = 12, r_3 = \dbinom{3}{3} 2^3 = 8$。

禁止位置上无法摆放四辆及以上的车，因此，$r_i = 0, i \ge 4$。

综上，可以列表，

|  $k$  |   0   |   1   |   2   |   3   |   4   |   5   |   6   |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| $r_k$ |   1   |   6   |  12   |   8   |   0   |   0   |   0   |

并且计算摆放的方法数。

$$
\sum_{k=0}^{n} r_k (-1)^k (n-k)! = 1 \times 6! - 6 \times 5! + 12 \times 4! - 8 \times 3! = 240
$$

### EX24 Q(b)

$$
r_2 = 3\times 2 + \binom{3}{2} \times 4^2 = 54
$$

$$
r_3 = \binom{3}{1} \times 2 \times \binom{2}{1} \times 4 + 4^3 = 112
$$

$$
r_4 = \binom{3}{2} \times 2^2 + \binom{3}{1} \times 2 \times 4^2 = 108
$$

$$
r_5 = \binom{3}{2} \times 2^2 \times 4 = 48
$$

$$
r_6 = 2^3 = 8
$$

|  $k$  |   0   |   1   |   2   |   3   |   4   |   5   |   6   |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| $r_k$ |   1   |  12   |  54   |  112  |  108  |  48   |   8   |

$$
\sum_{k=0}^{n} r_k (-1)^k (n-k)! =
1 \times 6! - 12 \times 5! + 54 \times 4! - 112 \times 3! + 108 \times 2! - 48 \times 1! + 8 \times 0!
= 80
$$

### EX24 Q(c)

将棋盘禁止位分为相互独立的$F_1$和$F_2$，分别求出$F_1$和$F_2$能摆放车的方法数，如下表

|   $k$    |   0   |   1   |   2   |   3   |
| :------: | :---: | :---: | :---: | :---: |
| $F_1(k)$ |   1   |   5   |   6   |   1   |

|   $k$    |   0   |   1   |   2   |
| :------: | :---: | :---: | :---: |
| $F_2(k)$ |   1   |   3   |   1   |

进而求出$r_k = \sum_{j=0}^{k} F_1(j) F_2(k-j)$，

|  $k$  |   0   |   1   |   2   |   3   |   4   |   5   |   6   |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| $r_k$ |   1   |   8   |  22   |  24   |   9   |   1   |   0   |

$$
\sum_{k=0}^{n} r_k (-1)^k (n-k)! = 1 \times 6! - 8 \times 5! + 22 \times 4! - 24 \times 3! + 9 \times 2! - 1 \times 1! + 0 \times 0!= 161
$$

## EX25

> Count the permutations $i_1i_2i_3i_4i_5i_6$ of {1, 2, 3, 4, 5, 6}, where $i_1 \neq 1,5, i_3 \neq 2,3,5; i_4 \neq 4;$ and $i_6\neq 5,6$.

该问题等价于棋盘问题，可以把不等式转化为每一行（列）限制的序号，本题画出图像后可以发现，有 4 个大小为 1 的禁止块，2 个大小为 2 的禁止块。

从行的角度来思考，最多放置 4 个车，因为只有 4 行有禁止位，所以$r_5 = r_6 = 0$。

对于$r_2$的计算方法是：先固定一个，寻找另一个可能的位置，因此$r_2 = 6 + 4 + 3 + 3 + 2 + 2 = 20$。

$$
r_3 = (3 + 3 + 2 + 2) +(2 + 2 + 1) + (2) + (2) + (1)  = 20  \\
r+4 = 2 + 2 + 2  + 1 = 7
$$

|  $k$  |   0   |   1   |   2   |   3   |   4   |   5   |   6   |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| $r_k$ |   1   |   8   |  20   |  20   |   7   |   0   |   0   |

$$
\sum_{k=0}^{n} r_k (-1)^k (n-k)! = 1 \times 6! - 8 \times 5! + 20 \times 4! - 20 \times 3! + 7 \times 2! - 0 \times 1! + 0 \times 0!= 134
$$

![EX25 & EX26](imgs/c6ex25ex26.png)

### EX25PS

本题与其他禁止位放车问题的区别是：本题不太容易拆分成几个独立的部分。

## EX26

> Count the permutations $i_1i_2i_3i_4i_5i_6$ of {1, 2, 3, 4,5, 6}, where $i_1 \neq 1,2,3; i_2 \neq 1; i_3 \neq 1; i_5 \neq 5,6$ and $i_6 \neq 5,6$.

题目转化过程同 EX25，不过这次计算类似 EX24。将棋盘禁止位置划分为$F_1 , F_2$。

对于每一部分，先计算摆放车可能的种类数，

|   $k$    |   0   |   1   |   2   |   3   |
| :------: | :---: | :---: | :---: | :---: |
| $F_1(k)$ |   1   |   5   |   4   |   0   |

|   $k$    |   0   |   1   |   2   |   3   |
| :------: | :---: | :---: | :---: | :---: |
| $F_2(k)$ |   1   |   4   |   2   |   0   |

$$
r_k = {\sum_{i=0}^{n} F_1(i)} \times F_2(k-i)
$$

|  $k$  |   0   |   1   |   2   |   3   |   4   |   5   |   6   |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| $r_k$ |   1   |   9   |  26   |  26   |   8   |   0   |   0   |

$$
\sum_{k=0}^{n} r_k (-1)^k (n-k)! =
1 \times 6! - 9 \times 5! + 26 \times 4! - 26 \times 3! + 8 \times 2! = 124
$$

## EX27

> A carousel has eight seats, each representing a different animal. Eight girls are seated on the carousel facing forward (each girl ooks at another girl's back). In how many ways can the girls change seats so that each has a different girl in front of her? How does the problem change if all the seats are identical?

设 8 个位置的座位编号分别为$1,2, ..., 8$，并且 i 号座位面向 i+1 号座位（$1 \le i \le 7$），8 号座位面向 1 号座位。

第 i 个女孩分别坐在 i 号座位上，重排后坐到$s_i$号座位上，并且要求$s_i$不能面向$s_{i+1}$，
（$s_8$不能面向$s_1$）。

记$A_i$表示排列$s_1s_2 \cdots s_8$中$s_i$面向$s_{i+1}$
（其中$1 \le i \le 7$），
$A_8$表示表示排列$s_1s_2 \cdots s_8$中$s_8$面向$s_1$。

对于$|A_1|$，
有 8 种方式决定$s_1$，
$s_2$只能在前面，有 1 种方式，其余可以随意排列。
因此$|A_1| = 8 \times 1 \times 6!$。$|A_i|$同理。

对于$|A_1 \cap A_2|$，
有 8 种方式决定$s_1s_2s_3$；其余可以随意排列。
因此$|A_1 \cap A_2| = 8 \times 5!$，
其余$|A_i \cap A_j|$同理。

$$
\begin{aligned}
|\overline{A_1} \cap \overline{A_2} \cap \cdots \cap \overline{A_4}| = & |S| - \sum|A_i| + \sum |A_i A_j| - \cdots +  \sum|A_1 A_2 \cdots A_7 A_8| \\
=& 8! - \binom{8}{1} \times 8 \times 6! + \binom{8}{2} \times 8 \times 5! - \cdots + 8\\
=& 13000
\end{aligned}
$$

当所有座位都相同时，第一个选择座位的女孩只有 1 种选法，破环后，其余人选法不变，因此排列总数为$13000/8 = 1625$。

### EX27PS

参考答案给的符号有些歧义，$A_i$和$A_s$表示的含义不一样，但符号相同，
如 $|A_1|$ 对前者（$|A_{i=1}|$）来说，是$s_1$面向$s_2$的情况；
对于后者（$|A_{s=1}|$）来说则是所有 1 个交集的情况$\sum |A_i|$。

## EX28

> A carousel has eight seats, each representing a different animal. Eight boys are seated on the carousel but facing inward, so that each boy faces another (each boy looks at another boy's front). In how many ways can the boys change seats so that each faces a different boy? How does the problem change if all the seats are dentical?

第 i 个男孩坐在 i 号座位上，重排后坐到$s_i$号座位上。
设$A_i$表示$s_i$与$s_{i+4}$
面对面（$1\le i \le 4$），
因此需要求所有 i 与 i+4 没有面对面的情况，
即$|\overline{A_1} \cap \overline{A_2} \cap \overline{A_3} \cap \overline{A_4}|$。

对于$|A_1|$，
有 8 种方式决定$s_1$，
$s_5$只能在对面，有 1 种方式，其余可以随意排列。
因此$|A_1| = 8 \times 1 \times 6!$。
$|A_2|，|A_3| , |A_4|$同理。

对于$|A_1 \cap A_2|$，
有 8 种方式决定$s_1$，$s_5$随之确定；
有 6 种方式确定$s_2$，$s_6$也随之确定，其余可以随意排列。
因此$|A_1 \cap A_2| = 8\times 6 \times 4!$，
其余$|A_i \cap A_j|$同理。

$$
\begin{aligned}
    |\overline{A_1} \cap \overline{A_2} \cap \overline{A_3} \cap \overline{A_4}| = & |S| - \sum|A_i| + \sum |A_i A_j| - \sum|A_i A_j A_k| + \sum|A_i A_j A_k A_u| \\
    =& 8! - \binom{4}{1} (8 \times 6!) + \binom{4}{2} (8 \times 6 \times 4!) - \binom{4}{3} (8 \times 6 \times 4 \times 2!) + \binom{4}{4} (8 \times 6 \times 4 \times 2) \\
    =& 23040
\end{aligned}
$$

当所有座位都相同时，则变成了换排列，因此排列总数为$23040/8 = 2880$。

## EX29

> A subway has six stops on its route from its base location. There are 10 people on the subway as it departs its base location. Each person exits the subway at one of its six stops, and at each stop at least one person exits. In how many ways can this happen?

如果没有任何限制，10 个人一共有$6^{10}$种下车方案。
设$A_i$表示没人在 i 车站下车，所以有$|A_i| = 5^{10}$；
对于$|A_i \cap A_j| = 4^{10}$。
同理，可以计算多个子集车站没人下车的情况。

$$
\begin{aligned}
    |\overline{A_1} \cap \overline{A_2} \cap \cdots \cap \overline{A_6}| = & |S| - \sum|A_i| + \sum |A_i A_j| - \cdots + \sum|A_1 A_2 \cdots A_6| \\
    =& 6^{10} + (-1)^k \binom{6}{k} (6-k)^10 \\
    =& 6^{10} - 6 \times 5^{10} + 15 \times 4^{10} - 20 \times 3^{10} + 15 \times 2^{10} - 6 \times 1^{10} + 1 \times 0^{10} \\
    =& 1165626
\end{aligned}
$$

## EX30

> How many circular permutations are there of the multiset
>
> $$
> \{3 \cdot a,4\cdot b, 2 \cdot c, 1 \cdot d\},
> $$
>
> where, for each type of letter, all letters of that type do not appear consecutively?

设$A_i, i = 1, 2, 3$分别表示出现了*aaa*、*bbbb*和*cc*，
$A_1$可以当作${aaa, b, b, b, b, c, c, d}$的**循环排列**，
即$\frac{1}{8} \times \binom{8}{1 \; 4\; 2} = 105$。

|           set           | size  |
| :---------------------: | :---: |
|          $A_1$          |  105  |
|          $A_2$          |  60   |
|          $A_3$          |  280  |
|     $A_1 \cap A_2$      |  12   |
|     $A_1 \cap A_3$      |  30   |
|     $A_2 \cap A_3$      |  20   |
| $A_1 \cap A_2 \cap A_3$ |   3   |

$$
\begin{aligned}
    |\overline{A_1} \cap \overline{A_2} \cap \overline{A_3}| =& |S| - \sum |A_i| + \sum |A_iA_j| - \sum|A_iA_jA_k| \\
    =& \frac{1}{10} \times \frac{10!}{3! \cdot 4! \cdot 2! \cdot 1!} - (105+60+280) +(12+30+20) - 3 \\
    =& 1260 - (105+60+280) +(12+30+20) - 3 \\
    =& 874
\end{aligned}
$$

:::info 顺便一提

参考答案认为一个 d 本身就是所有的 d 连续出现。

*Since d appears in the multiset with multiplicity one, it is vacuously true that for any circular permutation of the multiset, all occurrences of d will appear consecutively.*

当然，最后解题时还是认为连续最起码要有一前一后的两项才算连续，所谓**连续**，参考 EX17，甚至本题数据和结果都与这题一致。
:::

## EX31

> How many circular permutations are there of the multiset
>
> $$
> \{2 \cdot a,3 \cdot b, 4 \cdot c, 5 \cdot d\},
> $$
>
> where, for each type of letter, all letters of that type do not appear consecutively?

设$A_i, i = 1, 2, 3, 4$分别表示出现了*aa*、*bbb*、*ccccc*和*ddddd*，$A_1$可以当作
${aa, b, b, b, c, c, c, c, d,d,d,d,d}$的**循环排列**，即$\frac{1}{13} \times \binom{13}{1 \; 3\; 4 \; 5} = 27720$。

|               set                | size  |
| :------------------------------: | :---: |
|              $A_1$               | 27720 |
|              $A_2$               | 6930  |
|              $A_3$               | 2520  |
|              $A_4$               | 1260  |
|          $A_1 \cap A_2$          | 1260  |
|          $A_1 \cap A_3$          |  504  |
|          $A_1 \cap A_4$          |  280  |
|          $A_2 \cap A_3$          |  168  |
|          $A_2 \cap A_4$          |  105  |
|          $A_3 \cap A_4$          |  60   |
|     $A_1 \cap A_2 \cap A_3$      |  42   |
|     $A_1 \cap A_2 \cap A_4$      |  30   |
|     $A_1 \cap A_3 \cap A_4$      |  20   |
|     $ A_2 \cap A_3 \cap A_4$     |  12   |
| $A_1 \cap A_2 \cap A_3 \cap A_4$ |   6   |

$$
\begin{aligned}
    |\overline{A_1} \cap \overline{A_2} \cap \overline{A_3} \cap \overline{A_4}|
    =& |S| - \sum |A_i| + \sum |A_iA_j| - \sum|A_iA_jA_k| + \sum|A_i A_j A_k A_u| \\
    =& \frac{1}{14} \times \frac{14!}{2! \cdot 3! \cdot 4! \cdot 5!} - \\
    & (27720+6930+2520+1260) +\\
    & (1260+504+280+168+105+60) -\\
    & (42+30+20+12) + 6\\
    =& 180180 - (27720+6930+2520+1260) +\\
    &(1260+504+280+168+105+60) - (42+30+20+12) + 6 \\
    =& 144029
\end{aligned}
$$

## EX32-40 说明 :construction: :ghost:

后面的题目似乎都是 6.5 小结莫比乌斯反演的练习题。

<!-- ~~因为不考，所以不写也不列给题目~~。 -->

其中 EX32 是关键的 :key: 题目；
EX33 是加星题目（\*）；
EX36 是带有禁止位置的放车问题，虽然指明了用 6.5 中的解题方法。但用 EX24 中的方法也能很快做出答案（6 种）。

<!-- ### 重要补充

EX32 这题虽然带着**欧拉**的关键字，但老师似乎并不认为是 6.5 小结的题目，所以考了这道题。 -->
