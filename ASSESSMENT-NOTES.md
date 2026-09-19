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

Responses are mapped to a six-point continuum. Reverse-keyed items are scored in the opposite direction. Item scores are averaged within domains, and domain means receive equal weight in the overall score.

The displayed **pattern stability** is calculated locally:

1. Resample the answered items within every domain 1,000 times with replacement.
2. Recalculate the equally weighted overall result for every resample.
3. Report the percentage of resamples returning the same nearest stage.
4. Report the stage range containing the middle 95% of resampled scores.

This is an internal sensitivity analysis. It does not include test–retest error, social-desirability bias, construct validity, translation effects, or errors caused by the stage framework itself. It must not be labeled “95% accurate.”

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
