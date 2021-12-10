# 容斥原理及应用EX

## 错位排序的一些结论

### 递推公式

$$
D_n = nD_{n-1} + (-1)^n, \quad D_n = (n-1)(D_{n-2} + D_{n-1})
$$

### 常数

可以使用上面的递推公式求出来错位排序常用的一些数值，$D_1 = 0, D_2 = 1, D_3 = 2, D_4 = 9, D_5 = 44, D_6 = 265, D_7= 1854$。

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

## EX1

> Find the number of integers between 1 and 10,000 inclusive that are not divisible by 4,5, or 6.

本题写的详细些，后面类似的题目就不再解释太多细节。

设$A_i, i=1,2,3$分别为1到10，000之间能被4、5和6整除的个数。

计算集合大小时采用**向下取整**，例如$\lfloor \dfrac{10000}{6} = 1666 \rfloor$，表明还取不到下一个6的倍数。

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

### 验证代码

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

## EX3

> Find the number of integers between 1 and 10,000 that are neither perfect squares nor perfect cubes.

既是完全平方数也是完全立方数的数一定能拆分成6个相同数的乘积。

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
> $$
> S = \{4 \cdot a, 3 \cdot b, 4 \cdot c, 5 \cdot d\}
> $$

多重集合的组合与方程的非负整数解个数等价，因此，满足

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

> Determine the number of solutions of the equation $x_1 + x_2 + x_3 + x_4 + X_5 = 14$ in nonnegative integers $x_1, x_2, x_3, x_4$, and $x_5$ not exceeding 5.

类似上一题，不过本题强调**非负**（**nonegative**）整数，取值范围因此是$1 \le x_i \le 5$，先平移变成$0 \le y_i \le 4$，求解方程$\sum y_i = 9$。
$$
\begin{aligned}
    |\overline{A_1} \cap \overline{A_2} \cap \overline{A_3} \cap \overline{A_4}  \cap \overline{A_5}| =& \binom{13}{4} - 5\binom{8}{4} + \binom{5}{2} \binom{3}{4}\\
    =& 715 - 5 \times 70 + 10 \times 0\\
    =& 365
\end{aligned}
$$

## EX9

> Determine the number of integral solutions of the equation
> $$
> x_1 + x_2 + x_3 + x_4 = 20
> $$
> that satisfy
> $$
> 1 \le x_1 \le 6, 0 \le x_2 \le 7, 4\le x_3 \le 8, 2 \le x_4 \le 6
> $$

过程略，答案96。

## EX10

> Let S be a multiset with k distinct objects with given repetition numbers $n_l, n_2, ... ,n_k$, respectively. Let r be a positive integer such that there is at least one r-combination of S. Show that, in applying the inclusion-exclusion principle to determine the number of r-combinations of S, one has $A_1 \cap A_2 \cap ... \cap A_k = \emptyset$.

多重集合r组合问题转化为方程$\displaystyle \sum_{i=0}^{k} x_i = r, 0 \le x_i \le n_i$的整数解问题。

假设存在一组解，因此有$r \le \displaystyle \sum_{i=0}^k n_i$，记$A_i$为满足$x_i \gt n_i$的集合。

当$A_1 \cap A_2 \cap ... \cap A_k \neq \emptyset$，即存在$r = \displaystyle \sum_{i=0}^{k} x_i \gt \displaystyle \sum_{i=0}^{k} n_i  \ge r$，产生矛盾，所以$A_1 \cap A_2 \cap ... \cap A_k = \emptyset$。

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

选出4个数放入自然位置，剩余4个数进行错位排序。

$$
D_4 = 4! (1-\frac{1}{1!} + \frac{1}{2!} - \frac{1}{3!} + \frac{1}{4!}) = 9
$$

因此总排列数为，

$$
\binom{8}{4} \times D_4 = 70 \times 9 = 630
$$

### EX12注

n元素错位排序可以直接使用公式，

$$
D_n = n! (1 - \frac{1}{1!} + \frac{1}{2!} - \frac{1}{3!} + \cdots + (-1)^{n} \frac{1}{n!})
$$

## EX13

> Determine the number of permutations of {1, 2, ... ,9} in which at least one odd integer is in its natural position.

设$A_i$表示i在自然位置上，

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
    =& 9! - 5\times 8! - \binom{5}{2} \times 7! + \binom{5}{3} \times 6! - 5 \times 5! + 4! \\
    =& 157824
\end{aligned}
$$

## EX14

> Determine a general formula for the number of permutations of the set {1, 2, ... , n} in which exactly k integers are in their natural positions.

选k个放到自然位置，其余n-k个进行错位排序。

$$
\binom{n}{k} D_{n-k}
$$

## EX15

>At a party, seven gentlemen check their hats. In how many ways can their hats be returned so that
> (a) no gentleman receives his own hat?
> (b) at least one of the gentlemen receives his own hat?
> (c) at least two of the gentlemen receive their own hats?

### EX15Q(a)

进行错位排序，$D_7 = 1854$。

### EX15Q(b)

全排序减去错位排序，即至少有一个在自然位置。$7! - D_7 = 3186$。

### EX15Q(c)

从上一问的结果中减去恰有一人在自然位置的情况，$3186 - 7 D_6 = 3186-7\times 265 = 1331$。

## EX16

> Use combinatorial reasoning to derive the identity
> $$
> n! = \binom{n}{0}D_0 + \binom{n}{1}D_{n-1} + \binom{n}{2} D_{n-2} + \cdots + \binom{n}{n-1}D_1 + \binom{n}{n}D_0
> $$
> (Here,$D_0$ is defined to be 1.)

记$S$为$\{1,2, \cdots , n\}$的全排列集合，$S_i$表示恰有i个元素在自然位置的排序，显然$\{S_i\}$划分了$S$，因此$|S| = \sum_{i=0}^{n}|S_i|$。

全排列$|S| = n!$，恰有i个自然位置的错位排序（参考EX14），有$\binom{n}{i}D_{n-i}$个，因此等式成立。

## EX17

> Determine the number of permutations of the multiset
> $$
> S = \{3\cdot a, 4 \cdot b, 2 \cdot c\}
> $$
> where, for each type of letter, the letters of the same type do not appear consecutively. (Thus *abbbbcaca* is not allowed, but *abbbacacb* is.)

设$A_i, i = 1, 2, 3$分别表示出现了*aaa*、*bbbb*和*cc*，$A_1$可以当作${aaa, b, b, b, b, c, c}$的排列，即$\binom{7}{1 \; 4\; 2} = 105$。

|           set           |              size              |
| :---------------------: | :----------------------------: |
|          $A_1$          |              105               |
|          $A_2$          | $\binom{6}{3 \; 1 \; 2} = 60$  |
|          $A_3$          | $\binom{8}{3 \; 4 \; 1} = 280$ |
|     $A_1 \cap A_2$      |  $\binom{4}{1 \;1\; 2} = 12$   |
|     $A_1 \cap A_3$      |   $\binom{6}{1 \;4\;1} = 30$   |
|     $A_2 \cap A_3$      |   $\binom{5}{3\;1\;1} = 20$    |
| $A_1 \cap A_2 \cap A_3$ |    $\binom{3}{1\;1\;1} = 3$    |

$$
\begin{aligned}
    |\overline{A_1} \cap \overline{A_2} \cap \overline{A_3}| =& |S| - \sum |A_i| + \sum |A_iA_j| - \sum|A_iA_jA_k| \\
    =& 1260 - (105+60+280) +(12+30+20) - 3 \\
    =& 874
\end{aligned}
$$

### EX17注

本题是求的**多重集合排序**问题和上面的多重集合组合问题进行区分。

## EX18

> Verify the factorial formula
> $$
> n! = (n-1)((n-2)! + (n-1)!), \qquad (n=2,3,4, ...).
> $$

没太看懂这题想干什么。

## EX19

> Using the evaluation of the derangement numbers as given in Theorem 6.3.1, provide a proof of the relation
> $$
> D_n = (n-1)(D_{n-2} + D_{n-1}), \quad (n=3,4,5, ...).
> $$

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
    =& (n-1) ((D_{n-1} + D_{n-2}))
\end{aligned}
$$

综上，等式成立。

## EX20

> Starting from the formula Dn = nDn- 1 + (_l)n, (n = 2,3,4, ... ), give a proof of Theorem 6.3.1.

使用数学归纳法证明，当$n \ge 1 $时，总有
$$
D_{n} =  n! \sum_{i=0}^{n} \frac{(-1)^i}{i!}
$$

当n=1时，1只能放在自然位置，没有错位排序，所以错位排序数为0，且$D_1 = 1! \times (1 - 1) = 0$成立。

当$n \ge 2$时，假设等式成立，对于n+1有

$$
\begin{aligned}
    D_{n+1} = & (n+1) D_{n} + (-1)^(n+1) \\
    =& (n+1) \times n! \sum_{i=0}^{n} \frac{(-1)^i}{i!} + (-1)^{n+1} \\
    =& (n+1)! \sum_{i=0}^{n} \frac{(-1)^i}{i!} + (n+1)! \times \frac{(-1)^{n+1}}{(n+1)!} \\
    =& (n+1)! \sum_{i=0}^{n+1} \frac{(-1)^i}{i!}
\end{aligned}
$$

符合等式，综上证毕。

## EX21

> Prove that $D_n$ is an even number if and only if n is an odd number.

语句p：n为奇数；语句q：$D_n$为偶数。
原题目可以转化为证明如下两个命题：若p成立，则q也成立；若q成立，则p也成立。

我们先考虑命题二，对于命题二我们验证它的「逆否命题」，若$\neg q$成立，则$\neg p$也成立。
命题转化为，n为偶数时，$D_n$为奇数。

观察式子$D_n = n D_{n-1} + (-1)^n$，当n为偶数时，$nD_{n-1}$项为偶数，$(-1)^n = 1$，显然$D_n$为奇数，命题二的逆否命题为真，命题二也为真。

对于命题一，我们采用数学归纳法证明。当n为奇数时，
并且当n=1时，有$D_1 = 0$，显然成立；

当n=2k+1($\ge 1$)时，设$D_{2k+1}$为偶数；那么当$n=2k+3$时，$D_{2k+3} = (2k+3)D_{2k+2} + (-1)^{(2k+3)} = (2k+3)D_{2k+2} - 1$，由命题二的逆否命题可知$D_{2k+2}$一定为奇数，进而两个奇数的乘积$(2k+3)D_{2k+2}$也为奇数，减一后为偶数。

综上，当n为奇数时，命题得证。

因为命题一和命题二均为真，因此可以说，$D_n$是偶数当且仅当n是奇数。

### EX21吐槽

颇有点压轴题的感觉，证明「若n为奇数，则$D_n$为偶数」这个命题前需要先证明「若n为偶数，则$D_n$为奇数」。如果有前一问的引导，难度会小一些；若是直接跳跃性地构造最后一问，难度就大很多。

## EX22

> Show that the numbers $$Q_n$$ of Section 6.5 can be rewritten in the form
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

### EX23注

该解法需要使用$D_n = (n-1)(D_{n-1} + D_{n-2})$的化简技巧，二答案的则是巧妙地添加了一个为0的项$(-1)^n \dfrac{n-n}{n!}$，进而，

$$
Q_{n} = (n-1)! \sum_{k=0}^n (-1)^k \frac{n-k}{k!}
$$

在之后的展开项中则分别是$D_n, D_{n-1}$的定义形式。

## EX24

> 