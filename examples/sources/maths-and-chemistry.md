:::exercise fill-blanks
prompt: Drag each value to its limit.
text: [$\displaystyle\lim_{x\to 0}\frac{1-\cos x}{x^{2}} = $]{latex} [[first]], [$\displaystyle\lim_{n\to\infty}\left(1+\frac{1}{n}\right)^{n} = $]{latex} [[second]]
- [first] [$\dfrac{1}{2}$]{latex}
- [second] [$e$]{latex}
- [ ] [$0$]{latex}
- [ ] [$1$]{latex}
explanation-correct: Near zero [1-\cos x \approx x^2/2]{math}, and the second limit is the definition of [e]{math}.
:::

:::exercise single-choice
prompt: |
  What is the value of this integral?
  ::::latex
  $\displaystyle\int_{0}^{\infty} e^{-x^{2}}\,\mathrm{d}x$
  ::::
- [x] [$\dfrac{\sqrt{\pi}}{2}$]{latex}
- [ ] [$\sqrt{\pi}$]{latex}
- [ ] [$\dfrac{\pi}{2}$]{latex}
- [ ] [$1$]{latex}
explanation-correct: Over the whole line the Gaussian integral is [\sqrt{\pi}]{math}, and the function is even: half of it lies on each side of zero.
:::

:::exercise match-definitions
prompt: Match each function with its derivative.
- [$\sin x$]{latex} => [$\cos x$]{latex}
- [$\ln x$]{latex} => [$\dfrac{1}{x}$]{latex}
- [$e^{2x}$]{latex} => [$2e^{2x}$]{latex}
- [$\arctan x$]{latex} => [$\dfrac{1}{1+x^{2}}$]{latex}
:::

:::exercise order-sentences
prompt: Put the proof that [\sqrt{2}]{math} is irrational in order.
- [1] Suppose [\sqrt{2} = p/q]{math}, a fraction in lowest terms.
- [2] Then [p^2 = 2q^2]{math}, so [p]{math} is even: [p = 2k]{math}.
- [3] So [q^2 = 2k^2]{math}, and [q]{math} is even too.
- [4] Both are even, so the fraction was not in lowest terms: a contradiction.
:::

:::exercise choose-all
prompt: Choose every series that converges.
- [x] [$\displaystyle\sum_{n=1}^{\infty}\frac{1}{n^{2}}$]{latex}
- [ ] [$\displaystyle\sum_{n=1}^{\infty}\frac{1}{n}$]{latex}
- [x] [$\displaystyle\sum_{n=1}^{\infty}\frac{(-1)^{n}}{n}$]{latex}
- [ ] [$\displaystyle\sum_{n=1}^{\infty}\frac{1}{\sqrt{n}}$]{latex}
- [x] [$\displaystyle\sum_{n=0}^{\infty}\frac{1}{n!}$]{latex}
explanation-correct: [\sum 1/n^p]{math} converges only for [p > 1]{math}; the alternating harmonic series converges to [-\ln 2]{math}, and the last one is [e]{math}.
:::

:::exercise true-false
prompt: True or false?
- [e^{i\pi} + 1 = 0]{math} => true
- [\sqrt{a+b} = \sqrt{a} + \sqrt{b}]{math} for all positive [a]{math} and [b]{math} => false
- The derivative of [x^x]{math} is [x^x(\ln x + 1)]{math} => true
- [0.999\ldots < 1]{math} => false
:::

:::exercise single-choice
prompt: Which equation for the combustion of propane is balanced?
- [ ] [\ce{C3H8 + 3O2 -> 3CO2 + 4H2O}]{latex chemistry}
- [x] [\ce{C3H8 + 5O2 -> 3CO2 + 4H2O}]{latex chemistry}
- [ ] [\ce{C3H8 + 5O2 -> 3CO2 + 2H2O}]{latex chemistry}
- [ ] [\ce{2C3H8 + 7O2 -> 6CO2 + 8H2O}]{latex chemistry}
explanation-correct: Three carbons, eight hydrogens and ten oxygens on each side: [\ce{C3H8 + 5O2 -> 3CO2 + 4H2O}]{latex chemistry}.
:::

:::exercise fill-blanks
prompt: Balance the half-reaction of permanganate in acid.
text: [\ce{MnO4- + 8H+ +}]{latex chemistry} [[electrons]] [\ce{e- -> Mn^2+ +}]{latex chemistry} [[water]] [\ce{H2O}]{latex chemistry}
- [electrons] [$5$]{latex}
- [water] [$4$]{latex}
- [ ] [$2$]{latex}
- [ ] [$8$]{latex}
explanation-correct: Manganese goes from +7 to +2, five electrons; the four oxygens leave as four molecules of water.
:::

:::exercise single-choice
prompt: |
  Which functional group does this molecule contain?
  ::::latex chemistry
  \chemfig{H_3C-C(=[2]O)-O-CH_2-CH_3}
  ::::
- [x] an ester
- [ ] an ether
- [ ] a ketone
- [ ] a carboxylic acid
explanation-correct: A carbonyl carbon bound to a second oxygen that carries a carbon chain: an ester, ethyl acetate.
:::

:::exercise flashcard
card-type: jolly
front-primary: |
  ::::latex chemistry
  \chemfig{*6(-=-=(-[:30]O-[:-30]C(-[:30]CH_3)=[:-90]O)-(-[:90]C(-[:30]OH)=[:150]O)=)}
  ::::
front-secondary: What is it called?
back-primary: aspirin
back-secondary: acetylsalicylic acid, [\ce{C9H8O4}]{latex chemistry}
:::

:::exercise flashcard
card-type: jolly
front-primary: The Taylor series of [e^x]{math}
front-secondary: about zero
back-primary: |
  ::::latex
  $\displaystyle e^{x} = \sum_{n=0}^{\infty}\frac{x^{n}}{n!}$
  ::::
back-secondary: It converges for every [x]{math}.
:::
