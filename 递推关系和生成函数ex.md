# 第7章 递推关系和生成函数

## EX1

> Let $f_0, f_1, f_2, ..., f_n, ...$, denote the Fibonacci sequence. By evaluating each of the following expressions for small values of n, conjecture a general formula and then prove it, using mathematical induction and the Fibonacci recurrence:
>
> (a) $f_1 + f_3 + \cdots + f_{2n-1}$
>
> (b) $f_0 + f_2 + \cdots + f_{2n}$
>
> (c) $f_0 - f_1 + f_2 - \cdots + (-1)^n f_n$
>
> (d)$f_0^2 + f_1^2 + \cdots + f_n^2$

### EX1(a)

先打表找规律，

```cpp
#include <iostream>
#include <vector>

using namespace std;

int main()
{
    int p = 0, q = 1;
    vector<int> fibList {p, q};
    for(int i = 0; i < 50; ++ i) {
        fibList.emplace_back(p+q);
        p = q;
        q = fibList.back();
    }
    
    int odd_total = 0, even_total = 0, alter_total = 0, square_total;
    int flag = 1;
    printf("idx \t sum_odd \t sum_total \t sum_alter \t sum_square \n");
    for(int i = 0; i < 10; ++ i) {
        odd_total += fibList[max(2*i-1, 0)];
        even_total += fibList[2*i];
        alter_total += flag * fibList[i];
        flag *= -1;
        square_total += fibList[i] * fibList[i];
        printf("%d \t %d \t %d \t %d \t %d\n", i, odd_total, even_total,
                alter_total, square_total);
    }
    return 0;
}
```

可以发现：$f_1 + f_3 + \cdots + f_{2n-1} = f_{2n}$，$f_0 + f_2 + \cdots + f_{2n} = f_{2n+1}-1$，$f_0 - f_1 + f_2 - \cdots + (-1)^n f_n = -1 + (-1)^n f_{n-1}$，$f_0^2 + f_1^2 + \cdots + f_n^2 = f_n f_{n+1}$。

数学归纳证明过程略。

### EX1(C)

$$
f_0 - f_1 + f_2 - \cdots + (-1)^n f_n = -1 + (-1)^n f_{n-1}, \quad (n \ge 1)
$$

对于特殊的$f_0$有$f_0 = 0$。

### EX1(d)

这个强调一下特殊的构造方法，辅助猜测递推公式，后面也会用到这个构造法。

$$
\begin{aligned}
    \sum_{i = 0}^{n} f_i &= f_0^2 + \sum_{i=1}^n f_i^2 \\
    &= f_0 f_1 + \sum_{i=1}^n f_i (f_{i+1} - f_{i-1}) \\
    &= f_0 f_1 + (f_1f_2 - f_1f_0) + (f_2 f_3 - f_2 f_1) + \cdots + (f_nf_{n+1} - f_n f_{n-1}) \\
    &= f_n f_{n+1}
\end{aligned}
$$

## EX2

> Prove that the nth Fibonacci number In is the integer that is closest to the number
> $$
> \frac{1}{\sqrt{5}} {\left( \frac{1+\sqrt{5}}{2} \right)^n}
> $$

设$a = \frac{1}{\sqrt{5}} {\left( \frac{1+\sqrt{5}}{2} \right)^n}$，并且知道$f_n = \frac{1}{\sqrt{5}} {\left( \frac{1+\sqrt{5}}{2} \right)^n} - \frac{1}{\sqrt{5}} {\left( \frac{1-\sqrt{5}}{2} \right)^n}$，那么$f_n$与a的距离为，

$$
\begin{aligned}
    |f_n - a| = & \left|\frac{1}{\sqrt{5}} {\left( \frac{1-\sqrt{5}}{2} \right)}^n \right| \\
    =& \frac{1}{\sqrt{5}} {\left( \frac{(\sqrt{5}-1)(\sqrt{5}+1)}{2(\sqrt{5}+1)} \right)}^n \\
    =& \frac{1}{\sqrt{5}} \left(\frac{2}{\sqrt{5}+1}\right)^n \\
    \le &\frac{1}{\sqrt{5}} \frac{2}{\sqrt{5}+1} \\
    = & \frac{2}{5 + \sqrt{5}} \\
    \le & \frac{2}{5}
\end{aligned}
$$

因此，$f_n$是最接近$\frac{1}{\sqrt{5}} {\left( \frac{1+\sqrt{5}}{2} \right)^n}$的整数。

## EX3

> Prove the following about the Fibonacci numbers:
>
> (a) $f_n$ is even if and only if n is divisible by 3.
>
> (b) $f_n$ is divisible by 3 if and only if n is divisible by 4.
>
> (c) $f_n$ is divisible by 4 if and only if n is divisible by 6.

### EX3(b)

$f_0 = 0,f_1 = f_2 = 1, f_3 = 2, f_4 = 3, \cdots$，$f_0$能被3整除，且n=0可被4整除。并且$f_1, f_2, f_3$均不能被3整除，$f_4=3$可被3整除，且n=4被4整除。

下面使用数学归纳法证明，当n被4整除时，$f_n$一定被3整除。

设$f_{4m}$被3整除，且$m \ge 1$。

$$
\begin{aligned}
    f_{n} =& f_{n-1} + f_{n-2} \\
    =& 2f_{n-2} + f(n-3) \\
    =& 3f_{n-3} + f_{n-4}
\end{aligned}
$$

因此$f_n$与$f_{n-4}$模三同余，即$f_n \equiv f_{n-4} (mod~3)$，并且$f_0=0,f_1 =f_2 = 1, f_3 = 2, f_4 = 3$，因而$f_n$被3整除当且仅当n可被4整除。

### EX3PS

从「周期性」的角度入手，验证了当$n$为4的倍数时$f_n$可被3整除，并且当$n$不是4的倍数时，$f_n$也一定不能被3整除。

## EX4

> Prove that the Fibonacci sequence is the solution of the recurrence relation
> $$
> a_n = 5a_{n-4} + 3 a_{n-5}, \quad (n \ge 5),
> $$
> where ao = 0, al = 1, a2 = 1, a3 = 2, and U4 = 3. Then use this formula to show that the Fibonacci numbers satisfy the condition that $f_n$ is divisible by 5 if and only if n is divisible by 5.

连续使用$a_n = a_{n-1} + a_{n-2}$进行代换，

$$
\begin{aligned}
    a_n =& a_{n-1} + a_{n-2} \\
    =& 2a_{n-2} + a_{n-3} \\
    =& 3a_{n-3} + 2a_{n-4} \\
    =& 5a_{n-4} + 3a_{n-5}
\end{aligned}
$$

因此$a_n$与$a_{n-5}$模5同余，即$a_n \equiv a_{n-5} (mod~5)$。并且由$a_0=0,a_1 = 1, a_2=1, a_3=2,a_4=3$可知，当且仅当n被5整除时，$f_{n}~mod~5=0$。

## EX5

> By examining the Fibonacci sequence, make a conjecture about when $f_n$ is divisible by 7 and then prove your conjecture.

对斐波那契数列$f_n$能被7整除，当且仅当n能被8整除。

## EX6-7

越来越懒了，**加星题**，题目都不想抄了。

## EX8

> Consider a 1-by-n chessboard. Suppose we color each square of the chessboard with one of the two colors red and blue. Let $h_n$ be the number of colorings in which no two squares that are colored red are adjacent. Find and verify a recurrence relation that hn satisfies. Then derive a formula for hn .

如果第一个方块着成红色，那么第二个方块只能着成蓝色，问题转化为$1\times (n-2)$棋盘着色问题；如果第一个方块着成蓝色，问题转化为$1\times (n-1)$棋盘着色问题；因此，$h_n = h_{n-1} + h_{n-2}$。

并且有初始项$h_0 = 1, h_1 = 2$，显然$h_n = f_{n+2}$。

## EX9

> Let $h_n$ equal the number of different ways in which the squares of a 1-by-n chessboard can be colored, using the colors red, white, and blue so that no two squares that are colored red are adjacent. Find and verify a recurrence relation that $h_n$ satisfies. Then find a formula for $h_n$.

考虑第一个方框放红色，那么第二个方块只能放白色或蓝色，问题转化为$h_{n-2}$；考虑第一个方块放白色或蓝色，那么问题转化为$h_{n-1}$。

$$
h_{n} = 2h_{n-1} + 2h_{n-2}, \quad h_0 = 1, h_1 = 3
$$

求解方程$x^2 = 2x+2$，对应$h_n$的通解为$h_n = c_1 (1+\sqrt{3})^n + c_2 (1-\sqrt{3})^n$。

带入初始值$h_0 = 1, h_1 = 3$可以求出常系数$c_1 = \frac{1}{2} + \frac{\sqrt{3}}{3}, c_2 = \frac{1}{2} - \frac{\sqrt{3}}{3}$。

$$
h_n = \frac{3+2\sqrt{3}}{6} (1+\sqrt{3})^n + \frac{3-2\sqrt{3}}{6}(1-\sqrt{3})^n, \quad n =0, 1, 2, \cdots
$$

## EX10

> Suppose that, in his problem, Fibonacci had placed two pairs of rabbits in the enclosure at the beginning of a year. Find the number of pairs of rabbits in the enclosure after one year. More generally, find the number of pairs of rabbits in the enclosure after n months.

设第t个月时有$g_t$个兔子，满足$g_t = g_{t-1} + g_{t-2}, g_0 = 0, g_1 = 2$，可以求出通解，

$$
g_t = \frac{2}{\sqrt{5}} \left( \frac{1+\sqrt{5}}{2} \right)^t - \frac{2}{\sqrt{5}} \left( \frac{1-\sqrt{5}}{2} \right)^t = 2f_t
$$

第一个月再过n个月是第n+1月，因此有$g_{n+1}$对兔子。

### EX10注

本题以n作为一个常量（n个月后），为了区分就需要把未知量设为t。

## EX11

> The Lucas numbers $l_0, l_1, l_2, \cdots, l_n, \cdots$ are defined using the same recurrence relation defining the Fibonacci numbers, but with different initial conditions:
> $$
> l_n = l_{n-1} + l_{n-2}, \quad (n \ge 2), l_0 =2, l_1 = 1
> $$
> Prove that
>
> (a) $l_n = f_{n-1} + f_{n+1} \text{ for } n \ge 1$
>
> (b) $l_0^2 + l_1^2 + \cdots + l_n^2  = l_n l_{n+1} + 2 \text{ for } n \ge 0$

### EX11(a)

设$Z_n = f_{n-1} + f_{n+1} - l_{n}, n \ge 1$，$Z_1 = f_0 + f_2 - l_1 = 0 + 1 - 1 = 0$；$Z_2 = f_1 + f_3 - l_2 = 1 + 2 - 3 = 0$。

又因为$Z_n = Z_{n-1} + Z_{n-2}, n \ge 3$，所以$Z_n = 0, n \ge 1$。即有，

$$
l_n = f_{n-1} + f_{n+1}, \quad n \ge 1
$$

### EX11(b)

因为$l_{n+1} = l_n + l_{n-1}$，所以$l_n^2 = l_n (l_{n+1} - l_{n-1}), n \ge 1$。

$$
\begin{aligned}
    l_0^2 + l_1^2 + \cdots + l_n^2 =& l_0^2 + \sum_{i=1}^{n} l_i^2 \\
    =& 4 + (l_1l_2 - l_1l_0) + (l_2l_3 - l_2l_1) + \cdots + (l_{n}l_{n+1} - l_nl_{n-1}) \\
    =& 4 + l_n l_{n+1} - l_1l_0 \\
    =& l_n l_{n+1} + 2
\end{aligned}
$$

## EX12

> Let $h_0, h_1, h_2, \cdots, h_n, \cdots$ be the sequence defined by
>$$
>h_n = n^3, \quad (n \ge 0)
>$$
>Show that $h_n = h_{n-1} + 3n^2 -3n + 1$ is the recurrence relation for the sequence.

带入$h_{n-1} = (n-1)^3$化简。

## EX13

> Determine the generating function for each of the following sequences:
>
> (a) $c^0 =1, c, c^2, ..., c^n, ...$
>
> (b) $1, -1, 1, -1, ..., (-1)^n, ...$
>
> (c) $\dbinom{\alpha}{0}, -\dbinom{\alpha}{1}, \dbinom{\alpha}{2}, ... , (-1)^n \dbinom{\alpha}{n}, ... ,$ ($\alpha$ is a real number)
>
> (d) $1, \frac{1}{1!}, \frac{1}{2!}, ..., \frac{1}{n!}, ...$
>
> (e) $1, -\frac{1}{1!}, \frac{1}{2!}, ..., (-1)^n \frac{1}{n!}, ...$

无穷数列$h_0, h_1, h_2, \cdots, h_n， \cdots$对应的生成函数为

$$
g(x) = h_0 + h_1x + h_2 x^2 + \cdots + h_n x^n \cdots
$$

### EX13(a)

$$
\begin{aligned}
    g(x) =& 1 + cx + c^2 x^2 + \cdots + c^n x^n  + \cdots \\
    =& 1 + (cx) + (cx)^2 + \cdots + (cx)^n + \cdots \\
    =&\frac{1}{1-cx}
\end{aligned}
$$

### EX13(b)

$$
\begin{aligned}
    g(x) =& 1 - x + x^2 + \cdots + (-1)^n x^n  + \cdots \\
    =& 1 + (-x) + (-x)^2 + \cdots + (-x)^n + \cdots \\
    =&\frac{1}{1+x}
\end{aligned}
$$

### EX13(c)

$$
\begin{aligned}
    g(x) =& \binom{\alpha}{0} - \binom{\alpha}{1} x + \binom{\alpha}{2} x^2 + \cdots + (-1)^n \binom{\alpha}{n} x^n  + \cdots \\
    =& \sum_{k=0}^{\infty} \binom{\alpha}{k} (-x)^k \\
    =& (1-x)^\alpha
\end{aligned}
$$

### EX13(d)

$$
\begin{aligned}
    g(x) =& 1 + \frac{1}{1!} x + \frac{1}{2!} x^2 + \cdots + \frac{1}{n!} x^n  + \cdots \\
    = &e^x
\end{aligned}
$$

### EX13(e)

$$
\begin{aligned}
    g(x) =& 1 - \frac{1}{1!} x + \frac{1}{2!} x^2 - \cdots + (-1)^n \frac{1}{n!} x^n  + \cdots \\
    =& e^{-x}
\end{aligned}
$$

## EX14

> Let S be the multiset $\{\infty \cdot e_1, \infty \cdot e_2, \infty \cdot e_3, \infty \cdot e_4\}$ Determine the generating function for the sequence $h_0, h_1, h_2, \cdots, h_n， \cdots$, where $h_n$ is the number of n-combinations of S with the following added restrictions:
>
> (a) Each $e_i$ occurs an odd number of times.
>
> (b) Each $e_i$ occurs a multiple-of-3 number of times.
>
> (c) The element $e_1$ does not occur, and $e_2$ occurs at most once.
>
> (d) The element $e_1$ occurs 1,3, or 11 times, and the element $e_2$ occurs 2,4, or 5 times.
>
> (e) Each $e_i$ occurs at least 10 times.

### EX14(a)

$$
\begin{aligned}
    g(x) =&( x +  x^3 + x^5 + \cdots )( x +  x^3 + x^5 + \cdots )( x +  x^3 + x^5 + \cdots )( x +  x^3 + x^5 + \cdots ) \\
    = & \left( \frac{x}{1-x^2} \right)^4
\end{aligned}
$$

### EX14(b)

$$
\begin{aligned}
    g(x) =&( 1 +  x^3 + x^6 + \cdots )( 1 +  x^3 + x^6 + \cdots )( 1 +  x^3 + x^6 + \cdots )( 1 +  x^3 + x^6 + \cdots ) \\
    = & \frac{1}{(1-x^3)^4}
\end{aligned}
$$

### EX14(c)

$$
\begin{aligned}
    g(x) =&( 1 )(1 + x)(1 + x + x^2 + x^3 + \cdots )(1 + x + x^2 + x^3 + \cdots ) \\
    = & \frac{1+x}{(1-x)^2}
\end{aligned}
$$

### EX14(d)

$$
\begin{aligned}
    g(x) =&( x+x^3+x^{11})(x^2 + x^4 + x^5)(1 + x + x^2 + x^3 + \cdots )(1 + x + x^2 + x^3 + \cdots ) \\
    = & \frac{(x+x^3+x^{11})(x^2+x^4+x^5)}{(1-x)^2}
\end{aligned}
$$

### EX14(e)

$$
\begin{aligned}
    g(x) =&(x^{10} + x^{11} + \cdots )(x^{10} + x^{11} + \cdots )(x^{10} + x^{11} + \cdots )(x^{10} + x^{11} + \cdots ) \\
    =& x^{40}(1+x^2 + x^3 + \cdots)(1+x^2 + x^3 + \cdots)(1+x^2 + x^3 + \cdots)(1+x^2 + x^3 + \cdots) \\
    =& \frac{x^{40}}{(1-x)^4}
\end{aligned}
$$

## EX15

> Determine the generating function for the sequence of cubes
> $$
> 0, 1, 8, \cdots, n^3, \cdots
> $$

由第5章EX20知，

$$
n^3 = 6 \binom{n}{3} + 6 \binom{n}{2} + \binom{n}{1}
$$

$$
\begin{aligned}
    g(x) = & x + 8 x^ + \cdots + n^3 x^2 + \cdots \\
    =& \sum_{n=0}^{\infty} n^3 x^k \\
    =& \sum_{n=0}^{\infty}6 \binom{n}{3}x^n + \sum_{n=0}^{\infty}6\binom{n}{2}x^n + \sum_{n=0}^{\infty} \binom{n}{1}x^n \\
    =& 6x^3 \sum_{n=3}^{\infty} \binom{n}{3}x^{n-3} + 6x^2\sum_{n=2}^{\infty}\binom{n}{2}x^{n-2} + x\sum_{n=1}^{\infty} \binom{n}{1}x^{n-1} \\
    =& 6x^3 \sum_{n=0}^{\infty} \binom{n+3}{3}x^{n} + 6x^2\sum_{n=0}^{\infty}\binom{n+2}{2}x^{n} + x\sum_{n=0}^{\infty} \binom{n+1}{1}x^{n}
\end{aligned}
$$

由第5章EX43知，

$$
\frac{1}{(1-z)^m} = \sum_{n=0}^{\infty} \binom{m+n-1}{n}z^n, \quad |z| \lt 1
$$

因此，

$$
\begin{aligned}
    g(x) =& 6x^3 \sum_{n=0}^{\infty} \binom{n+3}{3}x^{n} + 6x^2\sum_{n=0}^{\infty}\binom{n+2}{2}x^{n} + x\sum_{n=0}^{\infty} \binom{n+1}{1}x^{n} \\
    =& 6x^3 \frac{1}{(1-x)^4} + 6x^2 \frac{1}{(1-x)^3} + x \frac{1}{(1-x)^2} \\
    =& \frac{x(x^2+4x+1)}{(1-x)^4}
\end{aligned}
$$

## EX16

>Formulate a combinatorial problem for which the generating function is
> $$
> (1+x+x^2)(1+x^2+x^4+x^6)(1+x^2+x^4+\cdots)(x+x^2+x^3+\cdots)
> $$

果篮中苹果、香蕉、西瓜和桃子，求苹果不超过2个，香蕉为不超过6个且为偶数，西瓜是偶数个，桃子至少有1个的组合数。

## EX17

>Determine the generating function for the number hn of bags of fruit of apples, oranges, bananas, and pears in which there are an even number of apples, at most two oranges, a multiple of three number of bananas, and at most one pear. Then find a formula for hn from the generating function.

$$
\begin{aligned}
    g(x) =& (1+x^2+x^4+\cdots)(1+x+x^2)(1+x^3+x^6+\cdots)(1+x) \\
    =& \frac{1}{(1-x)^2} \\
    =& \sum_{n=0}^{\infty} (n+1)x^n
\end{aligned}
$$

因此$h_n = (n+1)$。

### EX17注

注意原书题干中的印刷错误，至多有两个橙子。

## EX18

>Determine the generating function for the number $h_n$ of nonnegative integral solutions of
>$$
>2e_1+5e_2+e_3+7e_4=n
>$$

令$f_1 = 2e_1, f_2 = 5e_2, f_3 = e_3, f_4 = 7e_4$，所以有$f_1 + f_2 + f_3 + f_4 = n$，其中$f_1$是2的倍数，$f_2$是5的倍数，$f_3$是1的倍数，$f_4$是7的倍数。有生成函数，

$$
\begin{aligned}
    g(x) =& (1+x^2+x^4+\cdots)(1+x^5+x^{10}+\cdots)(1+x+x^2 + x^3+\cdots)(1+x^7+x^{14}+\cdots) \\
    =& \frac{1}{1-x^2} \frac{1}{1-x^5} \frac{1}{1-x} \frac{1}{1-x^7}
\end{aligned}
$$

## EX19

>Let $h_0, h_1, h_2, ... , h_n , ...$ be the sequence defined by $h_n = \dbinom{n}{2}, (n\ge 0)$. Determine the generating function for the sequence.

$$
\begin{aligned}
    g(x) =& \sum_{n=0}^{\infty} h_n x^n\\
    =& \sum_{n=0}^{\infty} \binom{n}{2} x^n \\
    =& x^2\sum_{n=2}^{\infty}\binom{n}{2}x^{n-2} \\
    =& x^2\sum_{n=0}^{\infty}\binom{n+2}{2}x^{n} \\
    =&  \frac{x^2}{(1-x)^3}
\end{aligned}
$$

### EX19注

本题可以算是EX15的一个子问题

## EX20

>Let $h_0, h_1, h_2, ... , h_n , ...$ be the sequence defined by $h_n = \dbinom{n}{3}, (n\ge 0)$. Determine the generating function for the sequence.

$$
\begin{aligned}
    g(x) =& \sum_{n=0}^{\infty} h_n x^n\\
    =& \sum_{n=0}^{\infty} \binom{n}{3} x^n \\
    =& x^3\sum_{n=3}^{\infty}\binom{n}{3}x^{n-3} \\
    =& x^3\sum_{n=0}^{\infty}\binom{n+3}{3}x^{n} \\
    =&  \frac{x^3}{(1-x)^4}
\end{aligned}
$$

## EX21

加星题，略。

## EX22

>Determine the exponential generating function for the sequence of factorials: $0!, 1!, 2!, 3!, ... , n!, . ..$.

$$
\begin{aligned}
    g^{(e)}(x) =& \sum_{n=0}^{\infty} h_n \frac{x^n}{n!}\\
    =& \sum_{n=0}^{\infty} n! \frac{x^n}{n!} \\
    =& \sum_{n=0}^{\infty} x^n \\
    =& \frac{1}{1-x}
\end{aligned}
$$

## EX23

>Let $\alpha$ be a real number. Let the sequence $h_0, h_1, h_2, ... , h_n , ...$ be defined by $h_0 = 1$, and $h_n = \alpha(\alpha-1)\cdots(\alpha-n+1), (n \ge 1)$. Determine the exponential generating function for the sequence.

$$
\begin{aligned}
    g^{(e)}(x) =& \sum_{n=0}^{\infty} h_n \frac{x^n}{n!}\\
    =& \sum_{n=0}^{\infty}  \alpha(\alpha-1)\cdots(\alpha-n+1) \frac{x^n}{n!} \\
    =& \sum_{n=0}^{\infty} \binom{\alpha}{n} x^n \\
    =& (1+x)^{\alpha}
\end{aligned}
$$

## EX24

> Let S be the multiset $\{\infty \cdot e_1, \infty \cdot e_2, \infty \cdot e_3, \cdots, \infty \cdot e_k\}$ Determine the exponential generating function for the sequence $h_0, h_1, h_2, \cdots, h_n， \cdots$, where $h_0=1$ and, for $n \ge 1$,
>
> (a) $h_n$ equals the number of n-permutations of S in which each object occurs an odd number of times.
>
> (b) $h_n$ equals the number of n-permutations of S in which each object occurs at least four times.
>
> (c) $h_n$ equals the number of n-permutations of S in which $e_1$ occurs at least once, $e_2$ occurs at least twice, ... , $e_k$ occurs at least $k$ times.
>
> (d) $h_n$ equals the number of n-permutations of S in which $e_1$ occurs at most once, $e_2$ occurs at most twice, ... , $e_k$ occurs at most $k$ times.

### EX24(a)

$$
\begin{aligned}
    g^{(e)}(x) =& (\frac{x}{1!}+\frac{x^3}{3!} + \frac{x^5}{5!} + \cdots)(\frac{x}{1!}+\frac{x^3}{3!} + \frac{x^5}{5!} + \cdots)\cdots (\frac{x}{1!}+\frac{x^3}{3!} + \frac{x^5}{5!} + \cdots)\\
    =& (\frac{x}{1!}+\frac{x^3}{3!} + \frac{x^5}{5!} + \cdots)^k \\
    =& \left(\frac{e^x - e^{-x}}{2}\right)^k \\
\end{aligned}
$$

### EX24(b)

$$
\begin{aligned}
    G^{(e)}(x) =& \frac{x^4}{4!}+\frac{x^5}{5!} + \frac{x^6}{6!} + \cdots \\
    =& e^x -1 - x - \frac{x^2}{2!} - \frac{x^3}{3!}  \\
\end{aligned}
$$

并且指数生成函数为$g^{(e)}(x) = \big(G^{(e)}(x)\big)^k$。

### EX24(c)

$$
\begin{aligned}
    G^{(e)}_{k}(x) =& \frac{x^k}{k!}+\frac{x^{k+1}}{{(k+1)}!} + \frac{x^{k+2}}{{(k+2)}!} + \cdots \\
    =& e^x -\sum_{j=0}^{k-1} \frac{x^j}{j!} \\
\end{aligned}
$$

指数生成函数为$g^{(e)}(x) = G^{(e)}_1(x)G^{(e)}_2(x)\cdots G^{(e)}_k(x)$。

### EX24(d)

$$
\begin{aligned}
    G^{(e)}_{k}(x) =& 1 + \frac{x}{1!} + \frac{x^2}{2!} + \cdots + \frac{x^k}{k!} \\
    =& \sum_{j=0}^{k} \frac{x^j}{j!} \\
\end{aligned}
$$

指数生成函数为$g^{(e)}(x) = G^{(e)}_1(x)G^{(e)}_2(x)\cdots G^{(e)}_k(x)$。

## EX25

>Let $h_n$ denote the number of ways to color the squares of a 1-by-n board with the colors red, white, blue, and green in such a way that the number of squares colored red is even and the number of squares colored white is odd. Determine the exponential generating function for the sequence $h_0, h_1, h_2, \cdots, h_n， \cdots$, and then find a simple formula for $h_n$.

$$
\begin{aligned}
    g^{(e)}(x) =& (1+ \frac{x^2}{2!} + \frac{x^4}{4!} + \cdots)(\frac{x}{1!}+\frac{x^3}{3!} + \frac{x^5}{5!}+\cdots)(1+\frac{x}{1!}+\frac{x^2}{2!} + \cdots)(1+\frac{x}{1!}+\frac{x^2}{2!} + \cdots)\\
    =& \frac{e^x+e^{-x}}{2} \frac{e^x - e^{-x}}{2} e^x e^x \\
    =& e^{2x} \frac{e^{2x}- e^{-2x}}{4} \\
    =& \frac{e^{4x}-1}{4} \\
    =& \frac{1}{4} \left( 4x + \frac{(4x)^2}{2!} + \cdots \right) \\
    =& \sum_{n=1}^{\infty} 4^{n-1} \frac{x^n}{n!}
\end{aligned}
$$

因此$h_n = 4^{n-1}, (n \ge 1)$，当n=0时，$h_0 = 1$。

## EX26

>Determine the number of ways to color the squares of a 1-by-n chessboard, using the colors red, blue, green, and orange if an even number of squares is to be colored red and an even number is to be colored green.

$$
\begin{aligned}
    g^{(e)}(x) =& (1+ \frac{x^2}{2!} + \frac{x^4}{4!} + \cdots)(1+ \frac{x^2}{2!} + \frac{x^4}{4!} + \cdots)(1+\frac{x}{1!}+\frac{x^2}{2!} + \cdots)(1+\frac{x}{1!}+\frac{x^2}{2!} + \cdots)\\
    =& \frac{e^x+e^{-x}}{2} \frac{e^x + e^{-x}}{2} e^x e^x \\
    =& e^{2x} \frac{e^{2x}+ e^{-2x}+2}{4} \\
    =& \frac{e^{4x}+2e^{2x}+1}{4} \\
    =& \frac{1}{4} \left(1+  (4+2\times 2)x + \frac{(4^2 + 2\times 2^2)x^2}{2!} + \cdots \right) \\
    =& \frac{1}{4} + \sum_{n=1}^{\infty} (4^{n-1}+2^{n-1}) \frac{x^n}{n!} \\
\end{aligned}
$$

因此$h_n = 4^{n-1}+2^{n-1}, (n \ge 1)$，当n=0时，$h_0 = 1$。

## EX27

>Determine the number of n-digit numbers with all digits odd, such that 1 and 3 each occur a nonzero, even number of times.

问题等价于$\{\infty \cdot 1, \infty \cdot 3, \infty \cdot 5, \infty \cdot 7, \infty \cdot 9\}$的多重集合n排列数，

$$
G^{(e)}_{1}(x) = G^{(e)}_{3}(x) = \frac{x^2}{2!}+\frac{x^{4}}{{4}!} + \cdots = \frac{e^x + e^{-x}}{2} -1
$$

$$
G^{(e)}_{5}(x) = G^{(e)}_{7}(x) = G^{(e)}_{9}(x) = e^x
$$

指数生成函数为,
$$
\begin{aligned}
g^{(e)}(x) =& G^{e}_1(x)G^{e}_3(x)\cdots G^{e}_9(x) \\
=& \left( \frac{e^x + e^{-x} -2}{2} \right)^2 e^{3x} \\
=& \frac{e^{5x} - 4e^{4x} + 6 e^{3x} - 4 e^{2x} + e^x}{4}
\end{aligned}
$$

因此$\displaystyle h_n = \frac{5^n-4\times 4^n + 6 \times 3^n - 4 \times 2^n+1}{4}$。

## EX28

>Determine the number of n-digit numbers with all digits at least 4, such that 4 and 6 each occur an even number of times, and 5 and 7 each occur at least once, there being no restriction on the digits 8 and 9.

问题等价于$\{\infty \cdot 4, \infty \cdot 5, \infty \cdot 6, \infty \cdot 7, \infty \cdot 8, \infty \cdot 9\}$的多重集合n排列数。

$$
G^{(e)}_{4}(x) = G^{(e)}_{6}(x) = 1+ \frac{x^2}{2!}+\frac{x^{4}}{{4}!} + \cdots = \frac{e^x + e^{-x}}{2}
$$

$$
G^{(e)}_{5}(x) = G^{(e)}_{7}(x) = e^x - 1
$$

指数生成函数为，
$$
\begin{aligned}
g^{(e)}(x) =& G^{e}_4(x)G^{e}_5(x)\cdots G^{e}_9(x) \\
=& \left( \frac{e^x + e^{-x}}{2} \right)^2 \left(e^x -1 \right)^2 e^{2x} \\
=& \frac{e^{6x} - 2e^{5x} + 3e^{4x} - 4 e^{3x} + 3 e^{2x} - 2e^x + 1}{4}
\end{aligned}
$$

因此$\displaystyle h_n = \frac{6^n-2\times 5^n + 3\times 4^n -4 \times 3^n +3 \times 2^n - 2}{4}, (n \ge 0)$， $h_0 = 0$。

### EX28强调

根据题目的意义来决定初始项$h_0$是什么，本题$h_0$是0位数中满足性质的个数，而0位数不可能满足**5和7至少出现一次**。

## EX29

> We have used exponential generating functions to show that the number hn of n-digit numbers with each digit odd, where the digits 1 and 3 occur an even number of times, satisfies the formula
> $$
> h_n = \frac{5^n + 2 \times 3^n + 1}{4}, \quad (n \ge 0)
> $$
> Obtain an laternative derivation of this formula.

根据n位数中1和3出现数量的奇偶性可以分类，

| 种类  | 1的数量 | 3的数量 |
| ----- | ------- | ------- |
| $a_n$ | 奇数    | 奇数    |
| $b_n$ | 奇数    | 偶数    |
| $c_n$ | 偶数    | 奇数    |
| $h_n$ | 偶数    | 偶数    |

对于$a_n$考虑移除最低位的数字，可以划分为三种情况：移除的数字为1，问题变为$c_{n-1}$；移除的数字为3，问题变为$b_{n-1}$，移除的数字是5、7或9，问题变为$3a_{n-1}$。
即有$a_n = c_{n-1} + b_{n-1} + 3a_{n-1}$。此外所有的可能总数是$5^n$。可以得到方程组，

$$
\begin{cases}
    a_n = c_{n-1} + b_{n-1} + 3a_{n-1} \\
    b_n = h_{n-1} + a_{n-1} + 3b_{n-1} \\
    c_n = a_{n-1} + h_{n-1} + 3c_{n-1} \\
    h_n = b_{n-1} + c_{n-1} + 3h_{n-1} \\
    a_n + b_n + c_n + h_n = 5^n
\end{cases}
$$

初始条件，$a_0 = b_0 = c_0 = 0, h_0 = 1$。由对称性知$b_n = c_n$，可得$a_n + 2b_n + h_n = 5^n, h_n - 3h_{n-1}=2b_{n-1}$，用后式消去前式中的$b_n$得$a_n+h_{n+1}-2h_{n} = 5^n$。

写出该式子的下一项$a_{n-1} + h_{n} -2h_{n-1} = 5^n$，做差并且调整$h_n$为最高次，进而得到$h_n - 4h_{n-1} + 3h_{n-2} = 2 \times 5^{n-2}$。

解方程略，可得其次递推关系的解$H_n = c_1 3^n + c_2$，非齐次递推关系的特解为$H_n^{*} = \frac{x^n}{4}$。

所以通解为$h_n = c_1 3^n + c_2 + \frac{5^n}{4}$。

对于1位数，$h_1 = 3$。带入$h_0 = 1, h_1=3$，解得$c_1 = \frac{1}{2}, c_2 = \frac{1}{4}$。进而求出，

$$
h_n = \frac{5^n+2\times 3^n + 1}{4}
$$

## EX30

> We have used exponential generating functions to show that the number hn of ways to color the squares of a 1-by-n board with the colors red, white, and blue, where the number of red squares is even and there is at least one blue square, satisfies the formula
> $$
> h_n = \frac{3^n - 2^n + 1}{2}, \quad (n \ge 1)
> $$
> with $h_0 = 0$. Obtain an alternative derivation of this formula by finding a recurrence relation satisfied by $h_n$ and then solving the recurrence relation.

| 种类  | 红色 | 蓝色    |
| ----- | ---- | ------- |
| $a_n$ | 奇数 | 无限制  |
| $b_n$ | 偶数 | $=0$    |
| $h_n$ | 偶数 | $\ge 1$ |

以$a_n$为例，考虑删除第一格。如果第一格为蓝色或白色，问题变为$2a_{n-1}$；如果第一格为红色，问题转化为从剩余n-1格中选出偶数个红格，总染色方案数为$3^{n-1}$，其中红色为奇数的方案是$a^{n-1}$，所以有$3^{n-1} - a_{n-1}$种方案选出偶数个红格。所以有$a_n = 2a_{n-1} + 3^{n-1} - a_{n-1} = a_{n-1} + 3^{n-1}$。

对于$b_n$，如果第一格为白色，问题转化为$b_{n-1}$，如果第一格为红色，同上有$2^{n-1} - b_{n-1}$，因此得$b_n = 2^{n-1}$。

$a_n + b_n + h_n$为总方案数$3^n$，可以递推做差得$h_n - h_{n-1} = 3^{n-1} - 2^{n-1}$。解方程过程略。

初始值$h_0 = 1$。

### EX30注

1. 利用好奇偶两种对立状态。
2. 题目强调要写出$h_n$的递推式，实际上容易先求出$a_n$，然后带入$a_n + b_n + h_n = 3^n$求出$h_n$，但这样不满足题目要求的解法。

## EX31

>Solve the recurrence relation $h_n = 4h_{n-2}, (n \ge 2)$ with initial values $h_0 = 0$ and $h_1 = 1$.

$$
h_n = c_1 2^n + c_2 (-2)^n
$$

带入初始值解得，$h_n = \displaystyle \frac{2^n - (-2)^n}{4}, ( n \ge 0)$。

## EX32

>Solve the recurrence relation $h_n = (n+2)h_{n-1}, (n \ge 1)$ with initial value $h_0 = 2$.

$$
\begin{aligned}
    h_n =& \frac{h_n}{h_{n-1}} \frac{h_{n-1}}{h_{n-2}} \cdots \frac{h_1}{h_0} h_0 \\
    =& (n+2)\times (n+1) \times \cdots \times (1+2) \times 2 \\
    =& (n+2)! \quad n \ge 0
\end{aligned}
$$

## EX33

>Solve the recurrence relation $h_n = h_{n-1} + 9h_{n-2} - 9h_{n-3}, (n \ge 3)$ with initial values $h_0 = 0, h_1 = 1$, and $h_2 = 2$.

方程$x^3 = x^2 + 9x - 9 = 0$的解为$x_1 = 3, x_3 = -3, x_3 = 1$。

$h_n = c_1 3^n + c_2 (-3)^n + c_3$，带入初始值有$\displaystyle h_n = 3^{n-1} +\frac{(-3)^{n-1}}{4} - \frac{1}{4}, (n \ge 0)$。

## EX34

>Solve the recurrence relation $h_n = 8h_{n-1} - 16h_{n-2}, (n \ge 2)$ with initial values $h_0 = -1$ and $h_1 = 0$.

$h_n = c_1 4^n + c_2n \cdot 4^n$，带入初始值有$\displaystyle h_n = (n-1)4^n, (n \ge 0)$。

## EX35

>Solve the recurrence relation $h_n = 3h_{n-2} - 2h_{n-3}, (n \ge 3)$ with initial values $h_0 = 1, h_1 = 0$, and $h_2 = 0$.

$h_n = (c_1+c_2 n) + c_3 (-2)^n$，带入初始值有$\displaystyle h_n = (\frac{8}{9}-\frac{2n}{3}) +  \frac{(-2)^n}{9}, (n \ge 0)$。

## EX36

>Solve the recurrence relation $h_n = 5h_{n-1} -6h_{n-2} - 4h_{n-3}+8h_{n-4}, (n \ge 4)$ with initial values $h_0 =0, h_1= 1, h_2 = 1$, and $h_3 = 2$.

方程$x^4 = 5x^3 -6x^2 -4x +8$的解为$x_1 = x_2 = x_3 = 2, x_4 = -1$。

$h_n = (c_1 n^2+c_2 n + c_3)2^n + c_4 (-1)^n$，带入初始值有$\displaystyle h_n = (-\frac{n^2}{24} + \frac{7n}{72} + \frac{8}{27})2^n -\frac{8\cdot (-1)^n}{27}, (n \ge 0)$。

### EX36注

分解方程和求解四元一次方程组的计算量很大。

## EX37

>Determine a recurrence relation for the number an of ternary strings (made up of 0s, 1s, and 2s) of length n that do not contain two consecutive 0s or two consecutive 1s. Then find a formula for $a_n$.

对长度为n且符合题目要求的字符串$T_n$进行切片，按照前两个字符是否相同进行分类；如果前两个字符相同，那么只能切出22和$T_{n-2}$，如果前两个字符不同，每一个字符（0、1或2）都有两种符合题意的$T_{n-1}$。

因此得到递推公式：$a_n = a_{n-2} + 2a_{n-1}, (n \ge 2)$，容易知道初始值$a_0 = 1, a_1 = 3$。

因此求出$a_n = \displaystyle \frac{(1+\sqrt{2})^{n+1}}{2} + \frac{(1-\sqrt{2})^{n+1}}{2}, (n \ge 0)$。

### EX37注

对比EX37、EX40和EX9

## EX38

>Solve the following recurrence relations by examining the first few values for a formula and then proving your conjectured formula by induction.
>
>(a) $h_n = 3h_{n-1}, \quad (n \ge 1); h_0 = 1$
>
>(b) $h_n = h_{n-1}-n+3, \quad (n \ge 1); h_0 = 2$
>
>(c) $h_n = -h_{n-1}+1, \quad (n \ge 1); h_0 = 0$
>
>(d) $h_n = -h_{n-1}+2, \quad (n \ge 1); h_0 = 1$
>
>(e) $h_n = 2h_{n-1}+1, \quad (n \ge 1); h_0 = 1$

以EX38(b)为例，先求出通项，再用数学归纳法验证，其余同理。

### EX38(b)

先求其次递推关系的解，$H_n = c_1 (1)^n$，后面的非齐次部分是一次多项式，同时隐含也是以1为底的指数。因此设$H_n^{*} = (An+B)n$。

带入递推关系求出$A=-\frac{1}{2}, B = \frac{5}{2}$，带入初始量得$h_n = \frac{4+5n-n^2}{2}$。

数学归纳法证明过程略。

## EX39

>Let $h_n$ denote the number of ways to perfectly cover a 1-by-n board with monominoes and dominoes in such a way that no two dominoes are consecutive. Find, but do not solve, a recurrence relation and initial conditions satisfied by $h_n$.

容易验证初始值$h_0 = h_1 = 1, h_2 = 2$，当$n \ge 3$时，如果第一块为单牌，问题变为$h_{n-1}$，如果第一块为多米诺骨牌（$1\times 2$牌），那么临界的块只能是单牌，问题转化为$h_{n-3}$。

综上有，

$$
h_n = h_{n-1} + h_{n-3}
$$

### EX39吐槽

头一次看到专门强调只推出关系不求解的题目。

## EX40

>Let $a_n$ equal the number of ternary strings of length n made up of Os, ls, and 2s, such that the substrings 00, 01, 10, and 11 never occur. Prove that
>$$
> a_n = a_{n-1} + 2a_{n-2}, \quad (n \ge 2),
>$$
>with $a_0 = 1$ and $a_1 = 3$. Then find a formula for $a_n$.

按照第一字符是否为2进行划分，由题意，长度为n的串第一个字符是2，问题变为$a_{n-1}$；如果第一个字符不是2，那么只能是0或1，如果为0，则第二个字符只能是2（因为不存在00和01），同理第一格字符如果为1，则第二个字符只能为2，因此问题转化为$2a_{n-2}$。综上有，

$$
a_n = a_{n-1} + 2a_{n-2}
$$

长度为0的串，长度为1的串显然都不含有00、01、10和11，$a_0 = 1, a_1 = 3$。

## EX41

> \* Let 2n equally spaced points be chosen on a circle. Let $h_n$ denote the number of ways to join these points in pairs so that the resulting line segments do not intersect. Establish a recurrence relation for $h_n$.

![EX41](https://raw.githubusercontent.com/furtherun/imgs/main/img/C8EX1.png)

选择一端固定在1上的线段为基线，另一端指向2k，圆上的2n个点被分为两组，一组有2k-2个，另一组有2n-2k个，同时问题$h_n$被划分为$h_{k-1}$和$h_{n-k}$。所以有，

$$
h_n = \sum_{k=1}h_{k-1}h_{n-k}, \quad n \ge 1, h_0 = h_1 = 1
$$

显然$h_n$与卡特兰数$C_n$有相同的递推关系和初始项，因此，

$$
h_n = \frac{1}{n+1} \binom{2n}{n}
$$

### EX41吐槽

为什么这个加星题抄题了呢？做到第8章的题目就知道了。

## EX42

>Solve the monhomogeneous recurrence realtion
>$$
>\begin{aligned}
>& h_n = 4h_{n-1} + 4^n, \quad (n \ge 1) \\
>& h_0 = 3
>\end{aligned}
>$$

其次递推关系的解为$H_n = c_1 4^n$，因此设特解为$H_n^{*} = An4^n$，求出$A=1$，带入初始项求出，
$$
h_n = (n+3)4^n, \quad n \ge 0
$$

### EX42注

虽然参考答案秀了技巧，把非齐次方程转化为$h_n - 8 h_{n-1} + 16 h_{n-2} = 0$。但着实没有必要，按照非齐次的模板解题速度一样很快。

## EX43

>Solve the monhomogeneous recurrence realtion
>$$
>\begin{aligned}
>& h_n = 4h_{n-1} +3\times 2^n, \quad (n \ge 1) \\
>& h_0 = 1
>\end{aligned}
>$$

略。

## EX44

>Solve the monhomogeneous recurrence realtion
>$$
>\begin{aligned}
>& h_n = 3h_{n-1} -2, \quad (n \ge 1) \\
>& h_0 = 1
>\end{aligned}
>$$

略

## EX45

>Solve the monhomogeneous recurrence realtion
>$$
>\begin{aligned}
>& h_n = 2h_{n-1} +n, \quad (n \ge 1) \\
>& h_0 = 1
>\end{aligned}
>$$

略

## EX46

>Solve the monhomogeneous recurrence realtion
>$$
>\begin{aligned}
>& h_n = 6h_{n-1} -9h_{n-2}+2n, \quad (n \ge 2) \\
>& h_0 = 1 \\
>& h_1 = 0
>\end{aligned}
>$$

略

## EX47

>Solve the monhomogeneous recurrence realtion
>$$
>\begin{aligned}
>& h_n = 4h_{n-1} -4h_{n-2}+3n+1, \quad (n \ge 2) \\
>& h_0 = 1 \\
>& h_1 = 2
>\end{aligned}
>$$

略

## EX48

> Solve the following recurrence relations by using the method of generating functions as described in Section 7.4:
>
> (a) $h_n = 4h_{n-2}, (n \ge 2); h_0=0, h_1 = 1$
>
> (b) $h_n = h_{n-1} + h_{n-2}, (n \ge 2); h_0 = 1, h_1 = 3$
>
> (c) $h_n = h_{n-1} + 9h_{n-2}-9h_{n-3}, (n \ge 3); h_0 = 0, h_1 = 1, h_2 = 2$
>
> (d) $h_n = 8h_{n-1} - 16 h_{n-2}, ( n \ge 2); h_0 = -1, h_1 = 0$
>
> (e) $h_n = 3h_{n-2} - 2h_{n-3}, (n \ge 3); h_0= 1, h_1 = 0, h_2 = 0$
>
> (f) $h_n = 5h_{n-1}-6h_{n-2}-4h_{n-3}+8h_{n-4}, (n \ge 4); h_0 = 0, h_1 = 1, h_2 = 1, h_3 = 2$

以EX48(b)和EX48(f)为例，其余题目略。

### EX48(b)

设生成函数为$g(x) = h_0 + h_1 x + h_2 x^2 + \cdots$，分别用$-x$和$-x^2$乘以g(x)得到，

$$
\begin{aligned}
& -xg(x) = -h_0x - h_1 x^2 - h_2 x^3 - \cdots \\
& -x^2 g(x) = - h_0 x^2 - h_1 x^3 - h_2 x^4 - \cdots \\
\end{aligned}
$$

两边求和化简得，
$$
(1-x-x^2) g(x) = h_0 + (h_0 - h_1)x + (h_2 - h_1 - h_0) x^2 + \cdots + (h_n - h_{n-1}-h_{n-2})x^{n} + \cdots
$$
再由$h_n - h_{n-1} - h_{n-2} = 0, (n \ge 2)$知，

$$
\begin{aligned}
g(x) =& \frac{1 + 2x}{1-x-x^2} \\
=& \frac{r}{1-rx} + \frac{s}{1-sx} \\
=& \frac{(r+s) -2rs x}{1-(r+s)x + rs x^2}
=& \sum_{n=0}^{\infty} (r^{n+1} + s^{n+1}) x^n
\end{aligned}
$$

其中，$\displaystyle r = \frac{1+\sqrt{5}}{2}, s = \frac{1- \sqrt{5}}{2}, r + s = 1, rs = -1$。

因此，$h_n = r^{n+1} + s^{n+1}, ( n \ge 0)$

### EX48(f)

设生成函数为$g(x) = h_0 + h_1 x + h_2 x^2 + \cdots$，分别用$-5x$、$6x^2$、$4x^3$和$-8x^4$乘以g(x)化简得到，

$$
\begin{aligned}
g(x) =& \frac{x-4x^2+3x^3}{1-5x+6x^2+4x^3-8x^4} \\
=& \frac{x-4x^2+3x^3}{(1-2x)^3(1+x)} \\
=& \frac{ax^2 + bx + c}{(1-2x)^3} + \frac{d}{1+x} \\
=& \frac{(a-8d)x^3 + (a+b+12d)x^2 + (b+c-6d)x + (c+d)}{(1-2x)^3(1+x)} \\
\end{aligned}
$$

因此可以得到方程组，

$$
\begin{cases}
    a-8d = 3 \\
    a+b+12d = -4 \\
    b+c-6d = 1 \\
    c+d = 0
\end{cases}
$$

解得，$a = \frac{17}{27}, b = -\frac{29}{27}, c = -\frac{8}{27}, d = \frac{8}{27}$。

$$
g(x) = \frac{1}{27} \frac{17x^2 - 29 x - 8}{(1-2x)^3} + \frac{8}{(1+x)}
$$

#### EX48(f)注

从上面的过程可以看出使用生成函数求解的计算量极大，因此考试如果不是强调使用该方法，不要考虑使用它。

### EX48说明

上课的时候听老师说不推荐使用该方法，不清楚到底考不考这个方法。并且也在(f)题中看到结果很难算出来（我也只是算了一半），不过流程还是要掌握一下。

## EX49

> (q-binomial theorem) Prove that
> $$
> (x+y)(x+qy)(x+q^2y)\cdots (x+q^{n-1}y) = \sum_{k=0}^{n} \binom{n}{k}_q x^{n-k} y^k,
> $$
> where
> $$
> n!_q = \frac{\Pi_{j=1}^n(1-q^j)}{(1-q)^n}
> $$
> is the q-factorial (cf. Theorem 7.2.1 replacing q in (7.14) with x) and
> $$
> \binom{n}{k}_q = \frac{n!_q}{k!_q (n-k)!_q}
> $$
> is the *q-binomial coefficient*.

采用数学归纳法证明，当n=1时，左边等于$(x+y)$，右边等于$\displaystyle \sum_{k=0}^{1} \binom{1}{k}_q x^{1-k} y^k = \binom{1}{0}_q x + \binom{1}{1}_q y = x+y$，左右两边相等，成立。

假设取n时等式成立，那么取n+1时，左右两边同时乘$(x+q^n y)$有，

$$
\begin{aligned}
   \sum_{k=0}^{n} \binom{n}{k}_q x^{n-k} y^{k} (x+q^n y) =& \sum_{k=0}^{n} \binom{n}{k}_q x^{n+1-k} y^k + q^n \sum_{k=0}^{n} \binom{n}{k}_q x^{n-k} y^{k+1} \\
   =&  \sum_{k=0}^{n} \binom{n}{k}_q x^{n+1-k} y^k + q^n \sum_{k=1}^{n+1} \binom{n}{k-1}_q x^{n+1-k} y^{k} \\
   =& \binom{n}{0}_q x^{n+1} + \sum_{k=1}^{n} (\binom{n}{k}_q+  q^n \binom{n}{k-1}_q) x^{n+1-k} y^{k} + \binom{n}{n}_q y^{n+1} \\
   =& \binom{n+1}{0}_q x^{n+1} + \sum_{k=1}^{n} (\binom{n}{k}_q+  q^n \binom{n}{k-1}_q) x^{n+1-k} y^{k} + \binom{n+1}{n+1}_q y^{n+1} \\
   =& \sum_{k=0}^{n+1} \binom{n+1}{k}_q x^{n+1-k} y^k
\end{aligned}
$$

即取n+1时等式仍成立，综上，证毕。

### EX49注

下面验证，

$$
\binom{n+1}{k}_q = \binom{n}{k}_q + q^n \binom{n}{k-1}_q
$$

### EX49参考

[q-binomial coefficients](https://www.coursera.org/lecture/enumerative-combinatorics/recurrence-relation-for-q-binomial-coefficients-1-YPwMg)

## EX50

> Call a subset S of the integers {1, 2, ... ,n} extmordinary provided its smallest integer equals its size:
> $$
> \min \{x: x \in S\} = |S|
> $$
> For example, S = {3,7,8}, is extraordinary. Let $g_n$ be the number of extraordinary subsets of {1, 2, ..., n}. Prove that
> $$
> g_n = g_{n-1} + g_{n-2} \quad (n \ge 3),
> $$
> with $g_1 = 1$ and $g_2 = 1$.

如果子集S是非凡的k子集，那么S中的最小元素是k，其余k-1个元素均比k大，因此非凡k子集的个数为$\dbinom{n-k}{k-1}$个，那么集合{1, 2, 3, ..., n}的所有非凡集为，

$$
\begin{aligned}
 g_n =& \sum_{k=1}^{n} \binom{n-k}{k-1} \\
 =& \sum_{k=1}^{n} \binom{n-k-1}{k-1} + \sum_{k=1}^{n} \binom{n-k-1}{k-2} \\
 =& \sum_{k=1}^{n} \binom{(n-1)-k}{k-1} + \sum_{k=1}^{n} \binom{(n-2)-{k-1}}{(k-1)-1} \\
 =& \sum_{k=1}^{n} \binom{(n-1)-k}{k-1} + \sum_{h=1}^{n} \binom{(n-2)-h}{h-1} \\
 =& \sum_{k=1}^{n-1} \binom{(n-1)-k}{k-1} + \sum_{h=1}^{n-2} \binom{(n-2)-h}{h-1} \\
 =& g_{n-1} + g_{n-2}
\end{aligned}
$$

由题意容易求出{1}的非凡集为{1}，{1, 2}的非凡集为{1}，因此$g_1 = g_2 = 1$。

## EX51

> Solve the recurrence relation
> $$
> \begin{aligned}
> &h_n = 3h_{n-1} - 4n, (n \ge 1)
> &h_0 = 2
> \end{aligned}
> $$
> from Section 7.6 using generating functions.

要求使用生成函数求解非齐次递推关系。生成函数为$g(x) = h_0 + h_1 x + h_2 x^2 + \cdots + h_n x^n + \cdots$,计算

$$
\begin{aligned}
g(x) -3xg(x) =& h_0 + (h_1 - 3h_0) x + \cdots + (h_n-h_{n-1})x^n + \cdots \\
=& 2 + (-4)x + (-8)x^2 + \cdots + (-4n)x^n + \cdots \\
=& 2-4(x+2x^2 + \cdots + nx^n + \cdots) \\
=& 2-4x\sum_{n=0}^{\infty} (n+1) x^{n} \\
=& 2-4\frac{x}{(1-x)^2}
\end{aligned}
$$

$$
\begin{aligned}
 g(x) =& \frac{2}{1-3x} - \frac{4x}{(1-3x)(1-x)^2} \\
 =& \frac{2}{1-3x} - \big( \frac{A}{1-3x} + \frac{Bx+C}{(1-x)^2} \big) \\
 =& \frac{2}{1-3x} - \big( \frac{3}{1-3x} + \frac{x-3}{(1-x)^2} \big) \\
 =& \frac{-1}{1-3x} + \frac{3-x}{(1-x)^2} \\
 =& - \sum_{n=0}^{\infty} (3x)^n + 3\sum_{n=0}^{\infty} (n+1) x^n - \sum_{n=0}^{\infty} x^n \\
 =& \sum_{n=0}^{\infty} (2n+3-3^n)x^n
\end{aligned}
$$

所以$h_n = 2n+3-3^n, (n \ge 0)$。

## EX52

> Solve the following two recurrence relations:
>
> (a) $h_n = 2h_{n-1} + 5^n, (n \ge 1)$ with $h_0 =3$
>
> (a) $h_n = 5h_{n-1} + 5^n, (n \ge 1)$ with $h_0 =3$

非齐次递推关系求解，略。

## EX53

>Suppose you deposit \$500 in a bank account -that pays 6% interest at the end of each year (compounded annually).
Thereafter, at the beginning of each year you deposit \$100.
Let hn be the amount in your account after n years (so h_0 = \$500).
Determine the generating function $g(x) = h_0 + h_1x + ... + h_nx^n + ...$ and then a formula for $h_n$.

$$
h_n = 1.06h_{n-1} + 100, n \ge 1, h_0 = 500
$$

$$
g(x) = h_0 + h_1 x + h_2 x^2 + \cdots
$$

$$
\begin{aligned}
(1-1.06x) g(x) =& h_0 + (h_1 - 1.06h_0)x + \cdots + (h_n - h_{n-1}) x^n + \cdots \\
=& 500 + 100x + 100x^2 + \cdots + 100x^n + \cdots \\
=&500 + 100(x + x^2 + \cdots ) \quad (*)\\
=&500 + \frac{100x}{1-x}
\end{aligned}
$$

$$
\begin{aligned}
   g(x) = & \frac{500}{1-1.06x} + \frac{100x}{(1-x)(1-1.06x)} \\
   =& \frac{500}{1-1.06x} +\frac{100}{0.06}(\frac{1}{1-1.06x}-\frac{1}{1-x}) \\
   =& (500+\frac{100}{0.06})\frac{1}{1-1.06x} - \frac{100}{0.06} \frac{1}{1-x} \\
   =& (500+\frac{100}{0.06})\sum_{n=0}^{\infty} (1.06x)^n - \frac{100}{.0.6} x^n \\
   =& [(500+\frac{100}{0.06})(1.06)^n - \frac{100}{0.06} ] x^n \\
\end{aligned}
$$

因此，
$$
h_n = 500(1.06)^n + \frac{100}{0.06}\big((1.06)^n - 1 \big)
$$

### EX53说明

(\*)式不留常数凑成$\frac{x}{1-x}$的形式方便下面的分解。

### EX53另解

$$
\begin{aligned}
h_n =& 500(1.06)^n + \sum_{k=0}^{n-1}100(1.06)^k \\
=& 500(1.06)^n + 100\frac{(1.06)^n-1}{0.06}
\end{aligned}
$$
