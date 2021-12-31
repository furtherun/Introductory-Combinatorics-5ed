# 第3章 鸽巢原理

## EX1

> Concerning Application 4, show that there is a succession of days during which  the chess master will have played exactly k games, for each k = 1,2, ... ,21.  (The case k = 21 is the case treated in Application 4.) Is it possible to conclude  that there is a succession of days during which the chess master will have played  exactly 22 games?

参考答案给出的思路，记$b_i$表示第i天所下盘数且$b_i \ge 1$，可以考虑两组单增序列，
$$
\{b_1+b_2 + \cdots + b_i\}, 1 \le i \le 77 \tag{1}
$$

$$
\{b_0+b_2 + \cdots + b_j + k\}, 0 \le j \le 76, b_0 = 0 \tag{2}
$$

每组序列都满足单增且大小都为77，序列(1)中没有重复元素，序列(2)中也没有重复元素。

序列(1)的上界为$12 \times 11 = 132$，序列(2)的上界S满足$S \lt b_1+b_2 + \cdots + b_{77} + k \le 12 \times 11 + 22 = 154$，同时S为整数，可以得到$S \le 153$。

综上，序列(1)和序列(2)的上界为153，也即最多有153个不同的数。而序列中一共有154个数，有鸽巢原理，序列(1)中至少有一个数$b_1+b_2 + \cdots + b_y$ 与序列(2)中的某个数$b_1+b_2 + \cdots + b_x+k$相同，满足，
$$
b_1+b_2 + \cdots + b_y = b_1+b_2 + \cdots + b_x + k
$$
可以求出，
$$
k = b_{x+1} + \cdots + b_{y}
$$

### 一个不太成功的想法

我们采用和书上一致的证法，设$a_i$是从第一天开始到第i天下棋总数，因此有，
$$
1 \le a_1 \lt a_2 \lt \cdots \lt a_{77} \le 12 \times 11 = 132 \tag{1}
$$
之后考虑序列
$$
1\le k \lt a_1 + k \lt a_2 + k \lt \cdots \lt a_{77} + k \le 132 + k \tag{2}
$$
序列(1)和序列(2)中的所有元素一定落在区间[1, 132+k]，且序列中一共有$77 \times 2 = 154$个元素，因此只要154 > 132 + k就满足鸽巢原理，此时，k < 21。

这个时候会漏掉k=22的情况，解决方案就是像参考答案一样，考虑压缩序列(2)的范围我们只选择从$a_1$到$a_{76}$的部分。那么有，
$$
1\le k \lt a_1 + k \lt a_2 + k \lt \cdots \lt a_{76} + k \lt a_{77} + k \le 132 + k  \le 154 \tag{3}
$$
这时候选择的部分不是$a_1 + k$到$a_{77} + k$，而是$k$到$a_{76}+k$，仍然是77个元素。结合序列(1)和序列(3)，就能找出存在$a_x = a_y + k$，当然，要补充定义$a_0 = 0$。

## EX2

> \* Concerning Application 5, show that if 100 integers are chosen from 1,2, ... ,200,  and one of the integers chosen is less than 16, then there are two chosen numbers  such that one of them is divisible by the other.

### EX2PS

加*不考则不再准备。

## EX3

> Generalize  Application  5  by  choosing  (how  many?)  integers  from  the set {1, 2, ..., 2n}.

至少选择n+1个数来保证它们中的一个能被另一个整除。

因为任意一个整数都可以写成$2^k \cdot a$的形式，因此可以根据指数k进行划分集合，同一集合里的数一定存在一个数能被另一个数整除。
$$
S_a = \{2^k \cdot a | k \ge 0, a \text{是奇数}\}
$$
对于从1到2n的整数，a的取值为1，3，5，...，2n-1，共有n个集合，由鸽巢原理，n+1个数至少存在2个数落在同一集合中。

## EX4

> Show  that if n + 1 integers are chosen  from  the set  {1, 2, ... , 2n},  then there are  always  two  which  differ  by  1.

记从集合中选取的数为$a_i$，并且假设$a_{i+1} - a_{i} \ge 2$，此外有，
$$
1 \le a_1 \lt a_2 \lt \cdots \lt a_n \lt a_{n+1} \le 2n
$$
可以得出范围$a_{n+1} - a_1 \le 2n-1$，然而，
$$
(a_{n+1} - a_n) + (a_{n} - a_{n-1}) + \cdots + (a_2 - a_1)  = a_{n+1} - a_1\ge 2n
$$
与上述中的范围矛盾，因此假设不成立。

采用鸽巢原理进行集合划分，把集合划分成$S_i = \{2i-1, 2i\}, 1 \le i \le n$，显然集合均不相交，且一共有n个集合，那么n+1个数一定满足至少有两个数落在同一集合。

## EX5

> Show  that if n  + 1  distinct  integers  are  chosen  from  the set  {1, 2, ... , 3n},  then  there are always  two  which  differ  by at most  2.

同上，可以把集合进行划分，并使用鸽巢原理。
$$
S_i = \{3i-2, 3i-1, 3i\}, 1\le i \le n
$$

## EX6

> Generalize  Exercises 4  and 5.

Show  that if n + 1 integers are chosen  from  the set  {1, 2, ... , kn},  then there are  always  two  which  differ  by  at most k-1(in other words, kess than k).

把集合按照如下方式进行划分，再使用鸽巢原理。
$$
S_i = \{ki-(k-1), \cdots , ki-1, ki\}, 1\le i \le n
$$

## EX7

> \* Show  that for  any given  52  integers there exist two of them whose sum, or else  whose  difference,  is  divisible  by 100.

### PS

略

## EX8

> Use the pigeonhole principle to prove that the decimal expansion of a rational  number min eventually is repeating. For example,
> $$
> \frac{34,478}{99,900} = 0.34512512512512512· ...
> $$

将分数记为两个正整数m和n的比值，即m/n。对于整数$i = 0,1, \cdots , n$，考察分数$10^i m / n$，并且记余数为$r_i$，显然余数的取值范围是$r_i = 0, 1, \cdots, n-1$，一共有n个，因此由鸽巢原理可以断定，存在整数$i, j (0 \le i \lt j \le n)$满足$r_i  = \ r_j$。

之后考虑分数$(10^jm-10^im) / n$，并且记$s = j-i$，这样存在整数q满足$10^{i}(10^s - 1)m = nq$，并且记$q/(10^s-1)$的余数为r。同样可以判断r的取值范围是$r = 0, 1, \cdots, 10^s -2$。可以写作$q = b(10^s -1) + r$。

那么分数$10^i m /n$就可以展开为等比级数的和，
$$
\begin{aligned}
\frac{10^i m}{n}
=& \frac{q}{10^s-1}\\
=& b + \frac{r}{10^s-1} \\
=&b + \frac{r}{10^s} + \frac{r}{10^{2s}} + \frac{r}{10^{3s}} + \cdots \frac{r}{10^{ns}} + \cdots
\end{aligned}
$$
所以，$10^i m/n$可以表示为循环小数的形式，循环部分的长度是j-i，那么m/n是$10^im/n$小数点左移i位，不改变循环部分，因此最终也是循环的。

### EX8PS

p44鸽巢原理的推论证明。

我觉得要考，不太容易。

## EX9

> In  a room there are 10  people,  none of whom are older than 60  (ages  are given  in  whole  numbers only)  but each of whom is  at least  1 year old.Prove that we  can  always  find  two  groups  of people  (with  no  common  person)  the  sum of whose  ages  is  the same.Can 10  be replaced  by a  smaller  number?

考虑10个人划分组的所有情况，一共有$2^{10} = 1024$种组，对于所有的组年龄总和一定在0和600之间，那么由鸽巢原理，一定能找到两种组的划分使组中的年龄之和相等。

## EX10

> A child watches TV at least one hour each day for seven weeks but, because of  parental rules, never more than 11 hours in anyone week. Prove that there is  some period of consecutive days in which the child watches exactly 20 hours of  TV. (It is assumed that the child watches TV for a whole number of hours each  day.)

本质还是大师下棋问题，我们设$a_i$是从第一天到第i天一共看电视$a_i$小时，那么有
$$
1 \le a_1 \lt a_2 \cdots \lt a_{77}  \le 7 \times 11 = 77
$$
同时，考虑如下序列，
$$
21 \le a_1 + 20 \lt a_2 + 20 \lt \cdots \lt a_{77} +20 \le 97
$$
两组序列一共有154个数，每个序列严格递增，并且都在区间[1, 97]中，由鸽巢原理一定存在i和j满足$a_j = a_i + 20$，也即从第i+1天到第j天恰好看20个小时电视。

### EX10PS

本题条件比EX1「宽松」很多。

## EX11

> A student has 37 days to prepare for an examination. From past experience she  knows that she will require no more than 60 hours of study. She also wishes to  study at least 1 hour per day. Show that no matter how she schedules her study  time (a whole number of hours per d!1y, however), there is a succession of days  during which she will have studied exactly 13 hours.

仍旧是大师下棋问题，这次我们练习另一种解法。

记$b_i$表示第i天学习的时间且$b_i \ge 1$，可以考虑两组单增序列，
$$
\{b_1+b_2 + \cdots + b_i\}, 1 \le i \le 37 \tag{1}
$$

$$
\{b_0+b_2 + \cdots + b_j + 13\}, 0 \le j \le 36 \tag{2}
$$

显然两组序列单增，并且范围在[1, 73]之间，并且一共有74个序列，那么一定存在分别来自(1)和(2)的两个序列，使得
$$
b_1+b_2 + \cdots + b_i = b_0+b_2 + \cdots + b_j + 13
$$
也即从第j+1天到第i天一共学习13小时。

## EX12

> Show by example that the conclusion of the Chinese remainder theorem (Application 6) need not hold when m and n are not relatively prime.

采用反证法证明该结论不成立，举例取m=4, n = 6, 因此$a \in \{0, 1, 2, 3\}, b \in \{0, 1, 2,3,4,5\}$，我们分别从集合中去取a和b，使a+b为奇数。并且假设存在这样的x同时满足x = 4p + a和x = 6q + b，两式相加并整理可以得到2x - 4p - 6q = a + b，等式左边为偶数，右边为奇数显然不合理，因此假设不成立。

### PS

上课提了一嘴。

## EX13

> \* Let S be a set of six points in the plane, with no three of the points collinear.  Color either red or blue each of the 15 line segments determined by the points of  S. Show that there are at least two triangles determined by points of S which  are either red triangles or blue triangles. (Both may be red, or both may be  blue, or one may be red and the other blue.)

## EX14

> A bag contains 100 apples, 100 bananas, 100 oranges, and 100 pears. If I pick  one piece of fruit out of the bag every minute, how long will it be before I am  assured of having picked at least a dozen pieces of fruit of the same kind?

由极端原理，考虑最差的情况所有水果都只取出了11个，此时花费44分钟。那么下一次一定会出现一打相同种类的水果，即至少45分钟会拿出一打相同水果。

## EX15

> Prove that, for any n + 1 integers $a_1, a_2, \cdots, a_{n+1}$, there exist two of the integers $a_i$ and $a_j$ with $i \ne j$ such that $a_i - a_j$ is divisible by n.

对于任意整数，总可以写成$a_i = p_i n + r_i$，其中$0 \le r_i \le n-1$且$r_i$为整数。由鸽巢原理，n+1个数模n的余数中一定能找到两个数余数相同，此时有
$$
a_j - a_i =(p_j n + r_j) - ( p_i n + r_i) = (p_j - p_i)n
$$
即两数之差被n整除。

## EX16

> Prove that in a group of n > 1 people there are two who have the same number  of acquaintances in the group. (It is assumed that no one is acquainted with  oneself. )

一共有n个人，那么可能认识人数的集合为$\{0, 1, \cdots, n-1\}$。

假设每个人认识的人数都不同，那么我们会发现存在Alice并不认识任何人而Bob认识所有人的矛盾情况，因此假设不成立。

### PS

需要强调的是题目中的「认识」关系是相互的，也就是说我认识你就等于你认识我，不存在我认识你而你不认识我的情况。

## EX17

> There are 100 people at a party. Each person has an even number (possibly  zero) of acquaintances. Prove that there are three people at the party with the  same number of acquaintances.

考虑按照认识的人数划分集合，记$f(idx) = 2k$表示第idx人认识的人数是2k，一共有50个集合。
$$
S_{2k} = \{idx | f(idx) =  2k\}， 0 \le k \le 49
$$
显然如果某个集合$|S_{2i}| \ge 3$，满足题意。下面考察所有集合$|S_{2k}| <3$的情况。

如果存在$|S_{i}| \le 1$，那么剩余99人（或100人）一定落在其他集合中，由鸽巢原理增强版知$\lceil \dfrac{99}{49} \rceil = 3$，一定存在某个集合满足$|S_j| \ge 3$，与假设矛盾。

那么，所有集合的大小只能为2，则出现$|S_0| = |S_{98}| = 2$，即会出现聚会中的两人不**认识**任何人，这限制了其他人最多认识96个人，即$|S_{98}| = 0$与所有集合大小为2条件矛盾，因此不存在所有集合$|S_{2k} |\le 2$的情况。

## EX18

> Prove that of any five points chosen within a square of side length 2, there are  two whose distance apart is at most $\sqrt{2}$.

把2×2的正方形划分为4个1×1的正方形，由鸽巢原理，存在一个正方形内至少有两个点，而同一个小正方形中最远的距离是$\sqrt{2}$。

## EX19

> (a) Prove that of any five points chosen within an equilateral triangle of side  length 1, there are two whose distance apart is at most $\dfrac{1}{2}$.  
>
> (b) Prove that of any 10 points chosen within an equilateral triangle of side  length 1, there are two whose distance apart is at most $\dfrac{1}{3}$.  
>
> (c) Determine an integer mn such that if mn points are chosen within an equilateral triangle of side length 1, there are two whose distance apart is at  most 1/n.

### Q(a)&Q(b)

根据EX18的做法，题目的关键是如何分割等边三角形，分割方法如下。

![image-20211023084730069](https://i.loli.net/2021/10/23/oXQHbZVlsRNphkf.png)

### Q(c)

只需要把每条边n等分，然后平行于另外两条边做平行线。考虑到等边三角形的面积公式为$\dfrac{\sqrt{3}}{4} a^2$，其中a为边长，分割前后总面积相同。
$$
\dfrac{\sqrt{3}}{4} 1^2 = \dfrac{\sqrt{3}}{4} {(\frac{1}{n})}^2x
$$
一共分割出$n^2$个小等边三角形，因此可以取$m_n = n^2 + 1$，使之符合鸽巢  原理。

## EX20

> Prove that $r(3,3,3) \le 17$.

考虑$K_{17} \rightarrow K_3, K_3, K_3$，并且使用红色、蓝色和绿色进行染色。

任选一个点x，与它相连的边有16条，由鸽巢原理加强版可知，至少存在$\lceil \dfrac{16}{3} \rceil = 6$条边的颜色相同，不妨设为红色。

那么对于与x相连的点$\{x_i\}_{i=1}^6$，如果他们之中的连线存在一条红边，则该条边上的两点和x则可以构成一个$K_3$；否则（即不存在红边），由$r(3, 3) = 6$可知，6个顶点染色一定可以构造出一个蓝色或绿色的$K_3$。

综上，17个点可以构造出$K_3$，不少于17个点也一定能构造出$K_3$，即$r(3,3,3) \le 17$。

### PS

首先要知道各个符号的含义，$K_{17} \rightarrow K_3, K_3, K_3$中有3个$K_3$，它们是「或者」的关系，只需要证明**一定存在**某个$K_3$就好，而不是全部颜色同时构造出$K_3$。

第二点就是证明的是**小于等于**而不是**等于**，后者还需要证明16个点**可以不构造（不一定存在）**出$K_3$，参考p49正文部分。

## EX21

> \* Prove that r(3, 3, 3) 2: 17 by exhibiting a coloring, with colors red, blue, and  green, of the line segments joining 16 points with the property that there do not  exist three points such that the three line segments joining them are all colored  the same.

### PS

略

## EX22

> Prove that
> $$
> \begin{equation}
>
> r\underbrace{(3,3,\cdots, 3)}_{\text{k+1}} \le (k+1) (r\underbrace{(3,3,\cdots, 3)}_{\text{k}} - 1) + 2
>
> \end{equation}
> $$
> Use this result to obtain an upper bound for
> $$
> r\underbrace{(3,3,\cdots, 3)}_{\text{n}}
> $$

仿照答案进行回答，记
$$
n = r_k = r\underbrace{(3,3,\cdots, 3)}_{\text{k}}, \quad m = (k+1)(n-1) + 2
$$
考虑仿造EX20构造，
$$
K_m \rightarrow \underbrace{K_3,K_3,\cdots, K_3}_{\text{k+1}}
$$
任取一点x，与它相连的m-1条边中至少有n条具有相同颜色（鸽巢原理加强版$\lceil \dfrac{m-1}{k+1} \rceil = \lceil \dfrac{(k+1)(n-1)+1}{k+1} \rceil = \lceil n-1+ \dfrac{1}{k+1} \rceil = n$），记该颜色为$C_1$。那么对于与x相连的点$\{x_i\}_{i=1}^n$，如果他们之中的连线存在一条$C_1$色边，则该条边上的两点和x则可以构成一个$K_3$；否则（即不存在$C_1$色边），由$r_k = n$可知，n个顶点染色一定可以构造出一个$C_i$色$(2 \le i\le k+1)$的$K_3$。

因此有$r_{k+1} \le m$，即，
$$
r_{k+1} = r\underbrace{(3,3,\cdots, 3)}_{\text{k+1}}\le  m = (k+1)(n-1) + 2 = (k+1) (r\underbrace{(3,3,\cdots, 3)}_{\text{k}} - 1) + 2
$$
下面求$r_n$的上界（下面的n与上面的n无关，更接近上面的k，上面使用m和n是为了和参考答案保持一致）。

目前由上面的证明已知$r_{n} \le n(r_{n-1} -1)+2$，还有一个边界条件$r_2 = r(3, 3) = 6$。
$$
\begin{cases}
r_n -2 \le n(r_{n-1}-1) \\
n(r_{n-1} -2) \le n(n-1)(r_{n-2}-1) \\
n(n-1)(r_{n-2} -2) \le n(n-1)(n-2)(r_{n-3}-1) \\
 \cdots \\
n(n-1)\times  \cdots \times4(r_3 -2) \le n(n-1)\times  \cdots \times 3(r_2 -1)
\end{cases}
$$
不等式两边分别求和得，
$$
r_n - 2 - n - n(n-1) - n(n-1)(n-2) - \cdots - n(n-1)\times \cdots\times4 \le n (n-1)\times  \cdots \times 3 \times 5
$$
移项整理，并用排列数表示，
$$
\begin{aligned}
r_n  \le & 2 + n + n(n-1) + n(n-1)(n-2) + \cdots + n(n-1)\times \cdots\times4 + (n-1)\times \cdots \times 3 \times 5 \\
=& 2 + \frac{n!}{(n-1)!} + \frac{n!}{(n-2)!} + \cdots \frac{n!}{3!} + 5\times\frac{n!}{2!} \\
=&\frac{5}{2}n! + \sum_{i = 1}^{n-3} \frac{n!}{n-i} + 2
\end{aligned}
$$

### PS

这题必考！——因为参考答案不全。

这题必不考！——试卷没这么大空白写。

## EX23

> The line segments joining 10 points are arbitrarily colored red or blue. Prove  that there must exist three points such that the three line segments joining them  are all red, or four points such that the six line segments joining them are all  blue (that is, $r(3, 4) \le 10$).

带入公式，显然有上述结论。
$$
r(m, n) \le \binom{m+n-2}{n-1} = \binom{m+n-2}{n-1}
$$
但是证明这个不等式本身也很复杂（试卷上写不开），所以还是考虑使用定义证明。

还是任取一点x，记与x相连的9条线中红色的线有m条，蓝色的线有n条，并且m+n=9进行分类讨论。

当$m \ge 4$时，$n = 9 - m \le 5$，如果m条红边相连的点组成的$K_m$中**存在一条红边**，则可以选择该红边上的两点与x组成红色的$K_3$；否则（不存在红边），则$K_m$全为蓝边，则容易找出一个蓝色的$K_4$。

当$m \le 3$时，$n = 9-m \ge 6$，n条蓝边相连的点组成$K_n$，由$K_6 \rightarrow K_3, K_3$可知，$K_n$中要么存在一个红色$K_3$（符合题意）；要么存在一个蓝色$K_3$，则该蓝色$K_3$与x又构成了蓝色$K_4$。

综上，$r(3, 4) \le 10$。

### PS

Q：为什么想到根据$m \ge 4$进行分类讨论？

A：我想说，要是不看前人的解答，我也想不出来。因为直观想法也是根据鸽巢原理加强版计算出可能的边界是$\lceil \dfrac{9}{2} \rceil = 5$，之后进行讨论。或许是考虑到红色的较少（红色的$K_3$，而不是蓝色的$K_3$），讨论了红色较少的分类。

~~我只能说，我研究懂这答案了，不考太可惜了，（误）。~~

## EX24

> Let $q_3$ and t be positive integers with $q_3 \ge t$. Determine the Ramsey number $r_t(t, t, q_3)$.

先说结论$r_t(t, t, q_3) = q_3$，采用红色、蓝色和绿色染色，之后分别求下界和上界。

考虑全都使用**绿色**给$K_{q_3 -1}$染色，此时不存在红色$K^t_t$，不存在蓝色$K^t_t$，也不存在绿色$K^t_{q_3}$，因此$r_t(t, t, q_3) \ge q_3$。

考虑$K_{q_3}$中所有的**大小为t的子集**，使用红色、蓝色和绿色进行染色，如果存在红色或蓝色$K^t_t$（只需要找到t个元素，全都为红色或蓝色即可），则满足$r_t(t, t, q_3) \le t \le q_3$；否则所有t个元素的子集均为绿色，即存在绿色$K^t_{q_3}$（存在$q_3$个元素，它所有t元素子集为绿色），也有$r_t(t,t,q_3) \le q_3$。

综上，有$r_t(t,t,q_3) = q_3$。

### PS

参考[链接](https://math.stackexchange.com/questions/332228/the-ramsey-number-rt-t-q-with-q-geq-t)中的回答，突然意识到$r_t(\cdots)$与$r(\cdots)$是不同的，前者的概念参考p50页正文，t子集。

## EX25

> Let $q_1, q_2, \cdots, q_k, t$ be positive integers, where $q_1 \ge t, q_2 \ge t, \cdots, q_k \ge t$. Let m  be the largest of $q_1, q_2, \cdots, q_k$· Show that
> $$
> r_t(m, m, \cdots , m) \ge r_t(q_1, q_2, \cdots, q_k)
> $$
> Conclude that, to prove Ramsey's theorem, it is enough to prove it in the case  that $q_1 = q_2 = \cdots = q_k$.

设$N = r_t(m, m, \cdots , m)$，对于$K_N$考虑所有的t元素子集着色，一定存在$C_i, 1 \le i \le k$色的$K_m^t$。
$$
K_N^t \rightarrow K_m^t, K_m^t , \cdots, K_m^t
$$
又因为$m = \max\{q_1, q_2 , \cdots, q_k\}$，那一定在每种颜色的$K_m^t$中找到该颜色的$K_{q_i}^t$，也即，
$$
K_N^t \rightarrow K_{q_1}^t, K_{q_2}^t, \cdots, K_{q_k}^t
$$
得$r_t(q_1, q_2, \cdots, q_k) \le N = r_t(m, m, \cdots , m)$，QED。

## EX26

> Suppose that the mn people of a marching band are standing in a rectangular  formation of m rows and n columns in such a way that in each row each person  is taller than the one to his or her left. Suppose that the leader rearranges the  people in each column in increasing order of height from front to back. Show  that the rows are still arranged in increasing order of height from left to right.

从队列中取第j列和第j+1列进行分析，$j = 1, 2, \cdots , n-1$，记每个位置的身高为$d_{i, j}$，初始时总有$d_{i,j} \lt d_{i, j+1}$。

并且定义「**匹配（match）**」状态为：重拍前两人站在同一行则是匹配状态。

假设重排后第i行不满足结论，即有$d_{i,j} \ge d_{i, j+1}$。

此外，可知第j列且在第i行后面的人一定不矮于第i行，$d_{x, j} \ge d_{i, j} \ge d_{i, j+1}, x= i+1, \cdots, m$，第j+1列且在第i行前的人一定不高于第i行，$d_{y, j+1}\le d_{i, j + 1} \le d_{i, j}， y = 1, 2, \cdots , i$。那么此时可知，第j列的第i行到第m行一定无法与第j+1列第1行到第i行形成匹配状态（匹配要满足**小于**而不是小于等于），则最多只可能是第j列的第1行到第i-1行与第j+1列的第1行到第i行形成匹配状态，但这违反鸽巢原理（第j+1列有两人与第j列同一人形成匹配状态），因此假设不成立。

### PS

答案看着比较短小，但总觉得不是很通顺，感觉如果考这题会很考验语言能力。

答案的大致意思是，左侧后面的人比右侧前面的人高（应该说不比他们矮），那么这些人一定不是右侧那些人曾经的匹配对象（右侧的匹配对象一定要**高于**左侧），那么右侧前i行人只能从左侧前i-1行找匹配对象，这样匹配对象就不唯一了。

画图更直观一些。

## EX27

> A collection of subsets of {1, 2, ... ,n} has the property that each pair of subsets  has at least one element in common. Prove that there are at most $2^{n-1}$ subsets in the collection.

设有k个不同子集$s_1, s_2, \cdots, s_k$满足题目要求，两两集合总能找到共同元素。那么这k个子集的补集$\bar{s_1}, \bar{s_2}, \cdots, \bar{s_k}$也各不相同，也不会有$s_1, s_2, \cdots s_k$中的共同元素，那么此时一共有2k个不同集合，集合的数量不会超过原集合的子集总数$2^n$，所以有$2k \le 2^n \Rightarrow k \le 2^{n-1}$，QED。

### PS

中文翻译有些歧义，求{1, 2, ... ,n}满足要求的子集构成的集合，最多有$2^{n-1}$个元素（这里的元素是集合）。

应该不考，稍微一背谁都能写出来。

## EX28

> At a dance party there are 100 men and 20 women. For each i from 1, 2, ... , 100,  the ith man selects a group of $a_i$ women as potential dance partners (his "dance  list," if you will), but in such a way that given any group of 20 men, it is always  possible to pair the 20 men with the 20 women, with each man paired with a  woman on his dance list. What is the smallest sum $a_1 + a_2 + \cdots + a_{100}$ for which  there is a selection of dance lists that will guarantee this?

对于第j位女士，设$b_j$表示她出现在100位男士的舞伴列表中的总次数，显然有$\displaystyle \sum_{i=1}^{100}a_i = \sum_{j=1}^{20}b_j$。

若$\displaystyle \sum_{j=1}^{20}b_j < 1620$，则$\displaystyle \lfloor\sum_{j=1}^{20}b_j /20 \rfloor \le 80$，由鸽巢原理加强版即存在$b_k \le 80$，那么可以找到20位男士，他们的舞伴列表中没有第k位女士，不符合题目要求。因此必须满足，$\displaystyle \sum_{j=1}^{20}b_j \ge 1620$。

下证存在$\displaystyle \sum_{i=1}^{100}a_i = 1620$组成一组合理的解。

对于前20位男士，第i位男士只选择第i位女士，$a_i = 1, i = 1, 2, \cdots 20$；后面的80位男士的舞伴列表选择全部女士，$a_i = 20, i = 21, 22, \cdots ,100$。此时有，
$$
\sum_{i=1}^{100}a_i = 20 \times 1 + 80 \times 20 = 1620
$$
并且任意选出20位男士都可以找到舞伴。

## EX29

> A number of different objects have been distributed into n boxes $B_1, B_2, \cdots, B_n$. All the objects from these boxes are removed and redistributed into n + 1 new  boxes $B_1^{*}, B_2^{*}, \cdots, B_{n+1}^{*}$, with no new box empty (so the total number of objects  must be at least n + 1). Prove that there are two objects each of which has the  property that it is in a new box that contains fewer objects than the old box  that contained it.

把新盒子与旧盒子均按递增排列，并且由题意知新盒子非空，旧盒子可能为空，确定下界。
$$
0 \le |B_1| \le |B_2| \le \cdots \le |B_n|, \quad 1 \le |B_1^{*}| \le |B_2^{*}| \le \cdots \le |B_n^{*}| \le |B_{n+1}^{*}|
$$
新旧盒子中的「对象」数量相等，因此不妨设$N = \displaystyle \sum_{i=1}^{n}|B_i| = \sum_{i=1}^{n+1}|B_i^{*}|$。定义函数，
$$
\Delta_i =N =\sum_{j=0}^{i+1}|B_{j}^{*}| - \sum_{j=1}^{i}|B_j|
$$
显然，我们有两个边界值$\Delta_0 = |B_{1}^{*}| \ge 1, \Delta_N = \displaystyle \sum_{i=1}^{n+1}|B_i^{*}| - \sum_{i=1}^{n}|B_i| = 0$。

在数列中总能找到r，满足$\Delta_{r-1} \gt 0, \Delta_{r} \le 0$，因此有$\Delta_{r-1} - \Delta_{r} = |B_r| - |B_{r+1}^{*}| \gt 0$，因此有$|B_r| > |B_{r+1}^{*}|$，结合上面的递增序列有，
$$
|B_1^{*}| \le |B_2^{*}| \le \cdots \le |B_{r+1}^{*}| \lt |B_r| \le |B_{r+1}| \le \cdots \le |B_n|
$$
目前已证明了当$1 \le i \le r+1, r \le j \le n$时，存在新盒子中的对象数量小于旧盒子中的对象数量，即$|B_{i}^{*}| \lt |B_j|$，之后定义$\theta$集合（元素满足条件：所在新盒子对象数小于旧盒子对象数），
$$
\theta = (B_1^{*} \cup B_2^{*} \cup \cdots \cup B_{r+1}^{*}) \cap (B_r \cup B_{r+1} \cup \cdots \cup B_n)
$$
下证，$|\theta| \ge 2$，即满足上述不等式的对象个数不小于2个。仍然考虑使用$\Delta_{r-1} \gt 0$，
$$
\begin{aligned}
|B_1^{*}| + |B_2^{*}| + \cdots + |B_{r}^{*}| \gt&  |B_1| + |B_2|  + \cdots + |B_{r-1}| \\
 =&|B_1 \cup B_{2} \cup \cdots \cup B_{r-1}| \\
 \ge&|(B_1 \cup B_{2} \cup \cdots \cup B_{r-1}) \cap (B_1^{*} \cup B_2^{*} \cup \cdots \cup B_{r+1}^{*})| \\
 =& |(B_1^{*} \cup B_2^{*} \cup \cdots \cup B_{r+1}^{*}) \cap(U- (B_r \cup B_{r+1} \cup \cdots \cup B_n))| \\
 =& |(B_1^{*} \cup B_2^{*} \cup \cdots \cup B_{r+1}^{*})- \theta| \\
 =& |B_1^{*}| +| B_2^{*}| + \cdots +|B_{r+1}^{*}|- |\theta| \\
 \ge& |B_1^{*}| +| B_2^{*}| + \cdots +|B_{r}^{*}| + 1- |\theta|
\end{aligned}
$$
此时，必须满足$1 - |\theta| < 0$，并且$|\theta|$取整数，所以$|\theta| \ge 2$，QED。

### PS

我完全没看出来这道题和这章有什么关系。
