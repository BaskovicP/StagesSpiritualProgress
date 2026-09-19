# Assessment design notes

## Status and intended use

This is an independent reflection aid, not a validated psychological test, diagnostic instrument, or substitute for spiritual direction. Its output should be interpreted as a structured summary of a person's self-reported pattern during the previous eight weeks.

## Why 28 questions

The development form uses 28 items: four differently angled items in each of seven domains. This is a practical compromise between respondent burden and the need to observe some within-domain consistency. The former 14-item form had only two items per domain, which was too little for a meaningful consistency check.

There is no universal question count that guarantees 95% confidence. Precision depends on item discrimination, threshold locations, dimensionality, respondent population, translations, and the decision boundary being used. Research instruments using calibrated item-response models commonly stop after a target standard error is reached, rather than after a fixed number of items. PROMIS computerized adaptive tests, for example, often use a minimum of four and a maximum of twelve items for one calibrated domain—not seven independent domains.

For this uncalibrated seven-domain prototype:

- **28 items** is the recommended fixed development form.
- At least **21 answered items and two per domain** are required to display a result.
- A future calibrated adaptive version could begin with 21–28 core items and add one targeted item in uncertain domains.
- Claiming 95% classification accuracy would require empirical calibration and cross-validation; adding questions alone cannot establish it.

## Item-writing approach

- Questions refer to concrete behavior during the **past eight weeks** instead of asking for a global self-rating.
- Domains are interleaved so respondents do not see a ladder of increasingly “holy” descriptions.
- Four angles are sampled in each domain.
- Half of the items are reverse-keyed to reduce simple agreement or repeated-click response patterns.
- The same five frequency choices are used throughout to lower cognitive burden.
- Wording avoids naming stages or displaying item scores.

Reverse wording can itself create method effects, so the balance should be tested through cognitive interviews and factor analysis rather than assumed to work.

## Current scoring

Let the selected response category be \(x \in \{0,1,2,3,4\}\), from **never or almost never** through **almost always**.

For a direct-keyed item, its score is:

\[
s = 1 + 1.25x
\]

This produces the five scores **1, 2.25, 3.5, 4.75, and 6**. For a reverse-keyed item:

\[
s_{reverse} = 7 - s
\]

Consequently, a higher item score always points in the direction of a higher stage, regardless of how the statement is worded.

For each domain \(d\), the answered item scores in that domain are averaged:

\[
D_d = \frac{1}{n_d}\sum_{i=1}^{n_d}s_{di}
\]

The overall score is the unweighted mean of the seven domain means:

\[
S = \frac{1}{7}\sum_{d=1}^{7}D_d
\]

This gives every domain equal influence even when some domains have four answered items and others have only two or three. A result is shown only after at least 21 items have been answered and every domain has at least two answers.

The displayed stage is the nearest whole number:

\[
\text{stage} = \operatorname{clamp}(\operatorname{round}(S), 1, 6)
\]

Thus, for example, an overall score from 2.50 through 3.49 is displayed as Stage III. Exact half-points round upward.

### Pattern stability and interval

The displayed **pattern stability** is calculated locally:

1. Within each domain, draw \(n_d\) answered item scores **with replacement** from that domain's answered scores.
2. Recalculate all seven domain means and their equally weighted overall score.
3. Repeat this process 1,000 times.
4. **Pattern stability** is the proportion of those 1,000 overall scores that round to the originally selected stage.
5. The internal 95% interval uses the 2.5th and 97.5th percentiles of the 1,000 overall scores. Its endpoints are converted to stages for display, while ensuring the selected stage remains inside the shown range.

The qualitative badge is assigned using deliberately conservative development thresholds:

- **High stability:** at least 26 answered items, at least three answers per domain, at least 80% same-stage resamples, and a raw 95% interval no wider than 1.0 score point.
- **Moderate stability:** at least 21 answered items, at least two answers per domain, at least 60% same-stage resamples, and a raw 95% interval no wider than 1.8 score points.
- **Low stability:** anything else.

These thresholds are design heuristics, not empirically calibrated cutoffs. The calculation is an internal sensitivity analysis. It does not include test–retest error, social-desirability bias, construct validity, translation effects, or errors caused by the stage framework itself. It must not be labeled “95% accurate,” and the stability percentage must not be interpreted as the probability that the person is truly in that stage.

## Work required for a validated instrument

1. Define the intended interpretation and target population precisely.
2. Have qualified spiritual directors and measurement specialists review construct coverage.
3. Conduct cognitive interviews separately in English and Croatian.
4. Pilot the full item bank in a representative sample with informed consent.
5. Test the seven-domain structure, local dependence, response-category functioning, and reliability.
6. Fit and cross-validate an ordinal model such as a multidimensional graded-response model.
7. Examine differential item functioning across language and relevant demographic groups.
8. Estimate standard errors around every stage threshold and publish decision-consistency results.
9. Revise or remove weak items before fixing a final form or adaptive stopping rule.

## Methodological references

- [Standards for Educational and Psychological Testing](https://www.testingstandards.net/)
- [PROMIS Instrument Development and Validation Scientific Standards](https://www.healthmeasures.net/images/PROMIS/PROMISStandards_Vers2.0_Final.pdf)
- [Initial PROMIS item-bank development and graded-response calibration](https://pmc.ncbi.nlm.nih.gov/articles/PMC2965562/)
- [COSMIN content-validity methodology](https://pmc.ncbi.nlm.nih.gov/articles/PMC5891557/)
