---
order: 4
---

# 第 4 章 生成排列和组合（上）

> [!NOTE]
> 本章的题目拆分为上下两篇，上篇包括 EX1-EX30，下篇则是剩余的 EX31-EX59。
>
> 上篇有仍有许多**较为简单但还缺少过程细节**的 :ghost: 题目，欢迎提交补充。

## EX1

> Which permutation of {1, 2, 3, 4, 5} follows 31524 in using the algorithm described in Section 4.1? Which permutation comes before 31524?

在 31524 后面的是 35124，前面的是 31254。

说说具体如何手工定位到 31524，首先，容易写出 2 位排列的表，

$$
\begin{matrix}
1  & 2\\
2  & 1
\end{matrix}
$$

插入 3 之前需要把表的每一行复制成三行，之后可以画出 3 位排列的表，定位 312 在第 3 行（奇数行）。

$$
\begin{matrix}
&1  & & 2  & 3\\
&1 & 3 & 2 \\
3& 1 &  & 2 \\
3& 2 &  & 1 \\
& 2 & 3 & 1 \\
& 2 &  & 1 & 3
\end{matrix}
$$

从插入 3 的规则发现，对于原来的奇数行是从右向左插入，偶数行则是从左向右插入，
可以判断 4 位排序的表中，312 所在的子表中 4 是从右向左插入的，因此可以得到该子表。

$$
\begin{matrix}
& 3 & & 1 & & 2 &4\\
& 3 & & 1 &4& 2 \\
& 3 &4 & 1 & & 2 \\
4& 3 & & 1 & & 2 \\
\end{matrix}
$$

同理，我们可以确定 4124 在该表中的第九行（$2 \times 4 + 1 = 9$），
因此在 5 位排序的子表中，5 也从右向左插入的，可以画出该子表，

$$
\begin{matrix}
& 3 & & 1 & & 2 & &4 &5\\
& 3 & & 1 & & 2 &5 &4\\
& 3 & & 1 &5 & 2 & &4\\
& 3 &5 & 1 & & 2 & &4\\
5& 3 & & 1 & & 2 & &4\\
\end{matrix}
$$

所以题目可以得出结论，在 31524 后面的是 35124，前面的是 31254。

:::details 算法验证

```cpp
#include <iostream>
#include <vector>
using namespace std;
void output(vector<int>& vi) {
    for(auto item: vi) {
        printf("%d ", item);
    }
    printf("\n");
}

int main()
{

    int n;
    scanf("%d", &n);
    vector<int> permList;
    for(int i = 1; i <= n; ++ i) permList.emplace_back(i);

    //use 0 for left and 1 for right
    vector<bool> state(n+1, false);
    while(true) {
        output(permList);
        int maxMovVal = -1;
        int maxMovIdx = -1;
        for(int i = 0; i < n; ++ i) {
            // printf("number: %d, state: %d\n", permList[i], (int)state[permList[i]]);
            if(!state[permList[i]] && i > 0) { //arrow to left
                if(permList[i] > permList[i-1] && permList[i] > maxMovVal) {
                    maxMovVal = permList[i];
                    maxMovIdx = i;
                }
            } else if (!!state[permList[i]] && i < n-1) { //arrow to right
                if(permList[i] > permList[i+1] && permList[i] > maxMovVal) {
                    maxMovVal = permList[i];
                    maxMovIdx = i;
                }
            }
        }

        if(maxMovIdx == -1) break; //no moveable variables

        if(!state[maxMovVal]) { //swap with left
            swap(permList[maxMovIdx], permList[maxMovIdx-1]);
        } else { //swap with right
            swap(permList[maxMovIdx], permList[maxMovIdx+1]);
        }
        //filp the state of number(s) which greater than selected number.
        for(int i = 0; i < n; ++ i) {
            if(permList[i] > maxMovVal) state[permList[i]] = !state[permList[i]];
        }
    }
    return 0;
}
```
:::

<!-- ### EX1 考后感

*感觉可能会考*。确实会考。 -->

## EX2

> Determine the mobile integers in
>
> $$
> \overrightarrow{4} \;\overleftarrow{8}\; \overrightarrow{3} \; \overleftarrow{1} \; \overrightarrow{6} \; \overleftarrow{7}\; \overleftarrow{2} \; \overrightarrow{5} \;.
> $$

比较数字和该数字箭头所指数字的大小，显然只有 8、3 和 7 可移动。

## EX3

> Use the algorithm of Section 4.1 to generate the first 50 permutations {1, 2, 3, 4, 5},
> starting with $\overleftarrow{1} \;\overleftarrow{2} \;\overleftarrow{3} \;\overleftarrow{4} \;\overleftarrow{5}$.

我们调整一下 EX1 中的代码，可以获得 50 个输出。

:::details 算法

```cpp
#include <iostream>
#include <vector>
using namespace std;
void output(vector<int>& vi) {
    for(auto item: vi) {
        printf("%d ", item);
    }
    printf("; ");
}

int main()
{

    int n;
    scanf("%d", &n);
    vector<int> permList;
    for(int i = 1; i <= n; ++ i) permList.emplace_back(i);

    //use 0 for left and 1 for right
    vector<bool> state(n+1, false);
    int cnt = 50;
    while(cnt --) {
        output(permList);
        if(cnt % 5 == 0) printf("\n");
        int maxMovVal = -1;
        int maxMovIdx = -1;
        for(int i = 0; i < n; ++ i) {
            // printf("number: %d, state: %d\n", permList[i], (int)state[permList[i]]);
            if(!state[permList[i]] && i > 0) { //arrow to left
                if(permList[i] > permList[i-1] && permList[i] > maxMovVal) {
                    maxMovVal = permList[i];
                    maxMovIdx = i;
                }
            } else if (!!state[permList[i]] && i < n-1) { //arrow to right
                if(permList[i] > permList[i+1] && permList[i] > maxMovVal) {
                    maxMovVal = permList[i];
                    maxMovIdx = i;
                }
            }
        }

        if(maxMovIdx == -1) break; //no moveable variables

        if(!state[maxMovVal]) { //swap with left
            swap(permList[maxMovIdx], permList[maxMovIdx-1]);
        } else { //swap with right
            swap(permList[maxMovIdx], permList[maxMovIdx+1]);
        }
        //filp the state of number(s) which greater than selected number.
        for(int i = 0; i < n; ++ i) {
            if(permList[i] > maxMovVal) state[permList[i]] = !state[permList[i]];
        }
    }
    return 0;
}
```

:::

:::details 输出结果

```md
1 2 3 4 5 ; 1 2 3 5 4 ; 1 2 5 3 4 ; 1 5 2 3 4 ; 5 1 2 3 4 ;
5 1 2 4 3 ; 1 5 2 4 3 ; 1 2 5 4 3 ; 1 2 4 5 3 ; 1 2 4 3 5 ;
1 4 2 3 5 ; 1 4 2 5 3 ; 1 4 5 2 3 ; 1 5 4 2 3 ; 5 1 4 2 3 ;
5 4 1 2 3 ; 4 5 1 2 3 ; 4 1 5 2 3 ; 4 1 2 5 3 ; 4 1 2 3 5 ;
4 1 3 2 5 ; 4 1 3 5 2 ; 4 1 5 3 2 ; 4 5 1 3 2 ; 5 4 1 3 2 ;
5 1 4 3 2 ; 1 5 4 3 2 ; 1 4 5 3 2 ; 1 4 3 5 2 ; 1 4 3 2 5 ;
1 3 4 2 5 ; 1 3 4 5 2 ; 1 3 5 4 2 ; 1 5 3 4 2 ; 5 1 3 4 2 ;
5 1 3 2 4 ; 1 5 3 2 4 ; 1 3 5 2 4 ; 1 3 2 5 4 ; 1 3 2 4 5 ;
3 1 2 4 5 ; 3 1 2 5 4 ; 3 1 5 2 4 ; 3 5 1 2 4 ; 5 3 1 2 4 ;
5 3 1 4 2 ; 3 5 1 4 2 ; 3 1 5 4 2 ; 3 1 4 5 2 ; 3 1 4 2 5 ;
```

:::

<!-- ### PS

我觉得这题必不可能考，没这么大空间，也没什么技巧性。 -->

## EX4

> Prove that in the algorithm of Section 4.1, which generates directly the permutations of {1, 2, ... , n}, the directions of 1 and 2 never change.

某个数方向变化的条件是本轮选择的数 m 比该数小，而排列中不存在比 1 小的数，因此 1 从不发生方向改变；
2 可能发生方向变化的情况是 1 被选为 m，而选中 m 的条件是 m 是本轮比较中的最大值，
而 1 绝不可能是该最大值，所以 1 不可能被选为 m，因此 2 也不可能发生方向变化。

## EX5

> Let $i_1 i_2 \cdots i_n$ in be a permutation of {1, 2, ... , n}
> with inversion sequence $b_1, b_2, \cdots, b_n$  and
> let $k = b_1 + b_2+ \cdots + b_n$. Show by induction that
> we cannot bring $i_1 i_2 \cdots i_n$ by fewer than k successive switches of adjacent terms.

对于相邻的两个数$i_x，i_y$，交换它们要么会增多一组逆序，要么会减少一组逆序，因此要消除 k 组逆序，交换相邻两个数的次数不能少于 k 次。

### EX5 PS

注意**逆序列**的概念。

## EX6

> Determine the inversion sequences of the following permutations of {1, 2, ... ,8}:
>
> (a) 35168274
>
> (b) 83476215

### EX6 Q(a)

|  $i$  |   1   |   2   |   3   |   4   |   5   |   6   |   7   |   8   |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| $a_n$ |   2   |   4   |   0   |   4   |   0   |   0   |   1   |   0   |

### EX6 Q(b)

|  $i$  |   1   |   2   |   3   |   4   |   5   |   6   |   7   |   8   |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| $a_n$ |   6   |   5   |   1   |   1   |   3   |   2   |   1   |   0   |

### EX6 PS

关于逆序列稍微说两句，首先就是逆序列的概念，容易望文生义（理解错）。$a_j$是排列在 j 前面且大于 j 的整数个数，逆序列是$a_1, a_2, \cdots , a_n$按顺序写出的序列。

## EX7

> Construct the permutations of {1, 2, ... ,8} whose inversion sequences are
>
> (a) 2,5,5,0,2,1,1,0
>
> (b) 6,6,1,4,2,1,0,0

### EX7 Q(a)

从大向小插，逆序数就是待插入数据前面的数字个数。

$$
\begin{aligned}
&8 \\
&87 \\
&867 \\
&8657 \\
&48657 \\
&486573 \\
&4865723 \\
&48165723
\end{aligned}
$$

### EX7 Q(b)

从小往大插入，逆序数就是待插入数字前面的空位数。

$$
\begin{matrix}
 &  &  &  &  &  & 1 &  \\
 &  &  &  &  &  & 1  & 2 \\
 & 3 &  &  &  &  & 1  & 2  \\
& 3 &  &  &  & 4 & 1  & 2 \\
 & 3 &  & 5 &  & 4 & 1 & 2 \\
 & 3 & 6 & 5 &  & 4 & 1 & 2 \\
7 & 3 & 6 & 5 &  & 4 & 1 & 2 \\
7 & 3 & 6 & 5 & 8 & 4 & 1 & 2 \\
\end{matrix}
$$

## EX8

> How many permutations of {1, 2, 3, 4, 5, 6} have
>
> (a) exactly 15 inversions?
>
> (b) exactly 14 inversions?
>
> (c) exactly 13 inversions?

### EX8 Q(a)

考虑逆序列满足$0 \le b_i \le n-i$，所以对于 6 位排序，
逆序数的最大个数分别为 5, 4, 3, 2, 1, 0，合计 15 个。

因此只有一种排列存在 15 个逆序。

### EX8 Q(b)

那么，我们只需要从上面的逆序中删除一个，则得到 14 个逆序，那么有 5 中删除方式，所以 14 个逆序的排列有 5 种方式。

### EX8 Q(c)

删除两个逆序的方式可以是从同一个数中删除 2 个逆序，也可以是从两个不同的数中分别删除一个逆序，

因此一共有$4 + \dbinom{5}{2} =14$种方式。

## EX9

> Show that the largest number of inversions of a permutation of {1, 2, ... , n} equals $n(n-1)/2$.
> Determine the unique permutation with $n(n -1)/2$ inversions.
> Also determine all those permutations with one fewer inversion.

最大逆序的个数就是任选两个数，$i_j, i_k, j < k$都有$i_j \gt i_k$，
因此最多有$\dbinom{n}{2} = \dfrac{n(n-1)}{2}$个逆序，
该排列是$n(n-1)\cdots321$；从该排列中任意交换一组逆序，
即可得到有$\dfrac{n(n-1)}{2}-1$个逆序的排列。

## EX10 :ghost:

> Bring the permutations 256143 and 436251 to 123456 by successive switches of adjacent numbers.

略 :ghost:

<!-- ### EX10 PS

就按题目说的相邻两个数交换，肯定不考。 -->

## EX11

> Let S = $\{x_7, x_6, \cdots , x_1, x_0\}$. Determine the 8-tuples of 0s and Is corresponding  to the following subsets of S:
>
> (a) $\{x_5, x_4, x_3\}$
>
> (b) $\{x_7, x_5, x_3, x_1\}$
>
> (c) $\{x_6\}$

### EX11 Q(a)

| $x_i$ | 7   | 6   | 5   | 4   | 3   | 2   | 1   | 0   |
| ----- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0/1   | 0   | 0   | 1   | 1   | 1   | 0   | 0   | 0   |

### EX11 Q(b)

| $x_i$ | 7   | 6   | 5   | 4   | 3   | 2   | 1   | 0   |
| ----- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0/1   | 1   | 0   | 1   | 0   | 1   | 0   | 1   | 0   |

### EX11 Q(c)

| $x_i$ | 7   | 6   | 5   | 4   | 3   | 2   | 1   | 0   |
| ----- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0/1   | 0   | 1   | 0   | 0   | 0   | 0   | 0   | 0   |

## EX12 :ghost:

> Let S = $\{x_7, x_6, \cdots , x_1, x_0\}$. Determine the subsets of S corresponding to the  following 8-tuples:
>
> (a) 00011011
>
> (b) 01010101
>
> (c) 00001111

<!-- ### EX12 PS

不可能考，略 -->

## EX13 :ghost:

> Generate the 5-tuples of Os and Is by using the base 2 arithmetic generating  scheme and identify them with subsets of the set $\{x_4, x_3, x_2 , x_1, x_0\}$.

<!-- ### EX13 PS

同上 -->

## EX14 :ghost:

> Repeat Exercise 13 for the 6-tuples of 0s and 1s.

<!-- ### EX14 PS

同上 -->

## EX15

> For each of the following subsets of $\{x_7, x_6, \cdots , x_1, x_0\}$, determine the subset  that immediately follows it by using the base 2 arithmetic generating scheme:
>
> (a) $\{x_4, x_1, x_0\}$
>
> (b) $\{x_7, x_5, x_3\}$
>
> (c) $\{x_7, x_6, x_5, x_4, x_3, x_2 , x_1, x_0\}$
>
> (d) $\{x_0\}$

以 (a) 为例，其余略。

### EX15 Q(a)

现在第 4 位，第 1 位和第 0 位填 1，二进制数为 00010011B，下一个二进制数则为 00010100B，对应的子集为$\{x_4, x_2\}$。

## EX16 :ghost:

> For each of the subsets (a), (b), (c), and (d) in the preceding exercise, determine the subset that immediately precedes it in the base 2 arithmetic generating  scheme.

<!-- ### EX16PS

这题写前驱子集，同样略。 -->

## EX17

> Which subset of $\{x_7, x_6, \cdots , x_1, x_0\}$ is 150th on the list of subsets of S when the  base 2 arithmetic generating scheme is used? 200th? 250th? (As in Section 4.3,  the places on the list are numbered beginning with 0.)

$150 = 2^7 + 2^4 + 2^2 + 2^1$，对应的二进制为 10010110B，对应的子集为$\{x_7, x_4, x_2, x_1\}$，其余同理，略。

## EX18

> Build (the corners and edges of) the 4-cube, and indicate the reflected Gray code  on it.

同样，我们还是给出验证程序。

:::details 验证程序

```cpp
#include <iostream>
#include <vector>
#include <cmath>
using namespace std;
void output(vector<int>& vi) {
    for(auto it = vi.rbegin(); it != vi.rend(); ++ it) {
        printf("%d ", *it);
    }
    printf("\n");
}
void reflectedGrayCode(vector<int>& vi, int n, int cnt, bool isEven) {
    if(cnt == n) return;
    printf("%d :\t", cnt+1);
    output(vi);

    if(isEven) { //
        vi[0] = !vi[0];
    } else {
        for(int i = 0; i+1 < vi.size(); ++ i) {
            if(vi[i] == 1) {
                vi[i+1] = !vi[i+1];
                break;
            }
        }
    }
    reflectedGrayCode(vi, n, cnt+1, !isEven);
}
int main()
{
    int n;
    scanf("%d", &n);
    vector<int> list(n, 0);
    reflectedGrayCode(list, (int)pow(2, n), 0, true);
    return 0;
}
```

:::

## EX19

> Give an example of a noncyclic Gray code of order 3.

| 序号 | 编码 |
| ---- | ---- |
| 0    | 000  |
| 1    | 001  |
| 2    | 011  |
| 3    | 010  |
| 4    | 110  |
| 5    | 100  |
| 6    | 101  |
| 7    | 111  |

### EX19PS

画立方体直观找答案，参考正文 p65。

不知道是否有算法求非循环 Gray 码。

## EX20

> Give an example of a cyclic Gray code of order 3 that is not the reflected Gray  code.

| 序号 | 编码 |
| ---- | ---- |
| 0    | 000  |
| 1    | 001  |
| 2    | 011  |
| 3    | 111  |
| 4    | 101  |
| 5    | 100  |
| 6    | 110  |
| 7    | 010  |

### EX20PS

画立方体求解，画立方体直观找答案，区分几个概念。

Gray 码：每个顶点访问一次；

循环：起始点和中止点共边（能回到起始点）；

反射：采用递归的方式构建。

## EX21 :ghost:

> Construct the reflected Gray code of order 5 by
>
> (a) using the inductive definition, and
>
> (b) using the Gray code algorithm.

参考 EX18 的验证代码。

## EX22 :ghost:

> Determine the reflected Gray code of order 6.

## EX23

> Determine the immediate successors of the following 9-tuples in the reflected  Gray code of order 9:
>
> (a) 010100110
>
> (b) 110001100
>
> (c) 111111111

### Q(a)

$\sigma(a_7\cdots a_1a_0) = 4$为偶数，后继为$a_0$取反，010100111。

### Q(b)

$\sigma(a_7\cdots a_1a_0) = 4$，后继为 110001101。

### Q(c)

$\sigma(a_7\cdots a_1a_0) = 9$为奇数，从右向左寻找第一位 1，并翻转它左侧的位，后继为 111111101。

## EX24

> Determine the predecessors of each of the 9-tuples in Exercise 23 in the reflected  Gray code of order 9.

### EX24Q(a)

$\sigma(a_7\cdots a_1a_0) = 4$为偶数，它由前驱翻转 1 个位得到，
因此前驱的$\sigma(a_7\cdots a_1a_0) = 3$为奇数，那么该数是由前驱翻转最右边的 1 左侧的位所得，可以求出前驱为 010100010。

### EX24Q(b)

$\sigma(a_7\cdots a_1a_0) = 4$，前驱$\sigma(a_7\cdots a_1a_0) = 3$，翻转最后一个 1 的左侧位得到前驱 110000100。

### EX24Q(c)

$\sigma(a_7\cdots a_1a_0) = 9$为奇数，前驱$\sigma(a_7\cdots a_1a_0) = 8$，翻转最后一位得到前驱 111111110。

## EX25 :star:

> \* The reflected Gray code of order n is properly called the reflected binary Gray  code since it is a listing of the n-tuples of Os and Is. It can be generalized  to any base system, in particular the ternary and decimal system. Thus, the  reflected decimal Gray code of order n is a listing of all the decimal numbers of  n digits such that consecutive numbers in the list differ in only one place and the  absolute value of the difference is 1. Determine the reflected decimal Gray codes  of orders 1 and 2. (Note that we have not said precisely what a reflected decimal  Gray code is. Part of the problem is to discover what it is.) Also, determine the  reflected ternary Gray codes of orders 1,2, and 3.

<!-- ### EX25PS

加星题看都不看。 -->

## EX26

> Generate the 2-subsets of {1, 2, 3, 4, 5} in lexicographic order by using the algorithm described in Section 4.4.

:::details 验证程序

```cpp
#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;
void output(vector<int>& vi) {
    for(auto it = vi.begin(); it != vi.end(); ++ it) {
        printf("%d ", *it);
    }
    printf("\n");
}
void generateRSubset(vector<int>& vi, unordered_set<int>& st, int n, int r) {
    output(vi);
    int k = r-1;
    for(; k >= 0; -- k) {
        if(vi[k] < n && st.find(vi[k]+1) == st.end()) {
            break;
        }
    }

    if(k < 0) return;
    int val = vi[k] + 1;
    for(int i = k; i < r; ++ i) {
        st.erase(vi[i]);
        vi[i] = val;
        st.insert(vi[i]);
        val ++;
    }
    generateRSubset(vi, st, n, r);
}
int main()
{
    int n, r;
    printf("Place input the Dictionary size(n) and the Subset size(r):\n");
    scanf("%d %d", &n, &r);
    vector<int> list;
    unordered_set<int> unord_st;
    for(int i = 1; i <= r; ++ i) {
        list.emplace_back(i);
        unord_st.insert(i);
    }
    generateRSubset(list, unord_st, n, r);
    return 0;
}
```

:::

## EX27 :ghost:

> Generate the 3-subsets of {1, 2, 3, 4, 5, 6} in lexicographic order by using the  algorithm described in Section 4.4.

同上。

## EX28

> Determine the 6-subset of {1, 2, ... ,10} that immediately follows 2,3,4,6,9,10  in the lexicographic order. Determine the 6-subset that immediately precedes  2,3,4,6,9,10.

首先从右向左寻找$a_k$，使$a_k < 10$并且$a_k + 1$不在序列中，
则定位到$a_k = 6$，然后进行$a_{k+i} = a_{k+i-1}+1, 1 \le i \lt r-k$替换，
可以得到后继为 2,3,4,7,8,9。这也是 EX26 算法的求解步骤。

求前驱的过程与求后继的过程相反，优先考虑能否从最右端开始进行**减一**，如果**减一**后与前面重复，则不合理；
向左移动一位后重复操作，如果能够**减一**，并且验算合理则求出前驱，因此前驱为 2,3,4,6,8,10。

## EX29

> Determine the 7-subset of {1, 2, ... , 15} that immediately follows 1,2,4,6,8,14,15  in the lexicographic order. Then determine the 7-subset that immediately precedes 1,2,4,6,8,14,15.

同上，我们只给出结果，后继为 1,2,4,6,9,10,11；前驱为 1,2,4,6,8,13,15。

## EX30

> Generate the inversion sequences of the permutations of {1, 2, 3} in the lexicographic order, and write down the corresponding permutations. Repeat for the  inversion sequences of permutations of {1, 2, 3, 4}.

逆序数$a_j$表示排在 j 前面比$j$大的数字个数。

可以先按照字典序写出所有的逆序列，再根据逆序列反推排序（EX7）。

根据逆序数的取值范围，$0 \le b_i \le n-i$，对于 n=4，逆序数各位最大取值为 3, 2, 1, 0。我们在求字典序的时候，可以看作是进行「逆序列加法」，不过这个数的每一位进制都不同，最低位是满 0 进 1！这样我们就有了生成字典序逆序列的方法，之后只要按照 EX7 中根据逆序列来生成排列。

### EX30PS

时间关系，这里不再给出验证代码。大体上与 r 进制加法的代码类似。

### 一个失败的尝试 :pill:

想要根据 EX1 的代码进行修改，但得到的逆序列并不是字典序的。

:::details 失败代码

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main()
{
    int n;
    scanf("%d", &n);
    vector<int> permList;
    for(int i = 1; i <= n; ++ i) permList.emplace_back(i);

    //use 0 for left and 1 for right
    vector<bool> state(n+1, false);

    //inversion list
    vector<int> invList(n+1, 0);

    while(true) {
        for(auto item: permList) {
            printf("%d ", item);
        }
        printf("\n");
        for(int i = 0; i < n; ++ i) {
            printf("%d ", invList[permList[i]]);
        }
        printf("\n\n");

        int maxMovVal = -1;
        int maxMovIdx = -1;
        for(int i = 0; i < n; ++ i) {
            // printf("number: %d, state: %d\n", permList[i], (int)state[permList[i]]);
            if(!state[permList[i]] && i > 0) { //arrow to left
                if(permList[i] > permList[i-1] && permList[i] > maxMovVal) {
                    maxMovVal = permList[i];
                    maxMovIdx = i;
                }
            } else if (!!state[permList[i]] && i < n-1) { //arrow to right
                if(permList[i] > permList[i+1] && permList[i] > maxMovVal) {
                    maxMovVal = permList[i];
                    maxMovIdx = i;
                }
            }
        }

        if(maxMovIdx == -1) break; //no moveable variables

        if(!state[maxMovVal]) { //swap with left
            swap(permList[maxMovIdx], permList[maxMovIdx-1]);
            invList[maxMovVal] ++;
        } else { //swap with right
            swap(permList[maxMovIdx], permList[maxMovIdx+1]);
            invList[maxMovVal] --;
        }
        //filp the state of number(s) which greater than selected number.
        for(int i = 0; i < n; ++ i) {
            if(permList[i] > maxMovVal) state[permList[i]] = !state[permList[i]];
        }
    }
    return 0;
}
```

:::
