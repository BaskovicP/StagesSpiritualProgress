(() => {
  "use strict";

  // Source-linked practical requirements, never averaged.
  // Gradation links an overview answer to a source description, not an awarded stage.
  window.spiritualAssessment = Object.freeze({
    "questionnaireVersion": 7,
    "preSpiritualQuestionIds": [
      "pre-spiritual-sin-v7",
      "pre-spiritual-prayer-v7",
      "pre-spiritual-sacraments-v7"
    ],
    "domainOrder": [
      "seriousSin",
      "venialSin",
      "imperfections",
      "suffering",
      "prayer",
      "examen",
      "sacraments"
    ],
    "highestAssessedStage": 6,
    "domainStageLimits": {
      "seriousSin": 3,
      "venialSin": 4,
      "imperfections": 6,
      "suffering": 6,
      "prayer": 6,
      "examen": 4,
      "sacraments": 4
    },
    "questionBlueprints": [
      {
        "id": "pre-spiritual-sin-v7",
        "domain": "seriousSin",
        "sources": [
          "Pre-Spiritual Childhood. Hardened in Sin. Mortal Sin",
          "Pre-Spiritual Childhood. Surface Christianity. Mortal Sin"
        ],
        "requirements": {
          "1": {
            "accepted": [
              2
            ]
          }
        },
        "preSpiritualOptions": {
          "hardenedInSin": [
            0
          ],
          "surfaceChristianity": [
            1
          ]
        },
        "unknownOptions": [
          3
        ],
        "optionCount": 4
      },
      {
        "id": "pre-spiritual-prayer-v7",
        "domain": "prayer",
        "sources": [
          "Pre-Spiritual Childhood. Hardened in Sin. Prayer",
          "Pre-Spiritual Childhood. Surface Christianity. Prayer"
        ],
        "requirements": {
          "1": {
            "accepted": [
              2
            ]
          }
        },
        "preSpiritualOptions": {
          "hardenedInSin": [
            0
          ],
          "surfaceChristianity": [
            1
          ]
        },
        "unknownOptions": [
          3
        ],
        "optionCount": 4
      },
      {
        "id": "pre-spiritual-sacraments-v7",
        "domain": "sacraments",
        "sources": [
          "Pre-Spiritual Childhood. Hardened in Sin. Sacraments",
          "Pre-Spiritual Childhood. Surface Christianity. Sacraments"
        ],
        "requirements": {
          "1": {
            "accepted": [
              2
            ]
          }
        },
        "preSpiritualOptions": {
          "hardenedInSin": [
            0
          ],
          "surfaceChristianity": [
            1
          ]
        },
        "unknownOptions": [
          3
        ],
        "optionCount": 4
      },
      {
        "id": "mortal-occasions-v4",
        "domain": "seriousSin",
        "sources": [
          "I. Mortal Sin",
          "II. Mortal Sin"
        ],
        "requirements": {
          "2": {
            "accepted": [
              2
            ]
          }
        },
        "unknownOptions": [
          3
        ],
        "optionCount": 4
      },
      {
        "id": "mortal-pattern-v6",
        "domain": "seriousSin",
        "sources": [
          "I. Mortal Sin",
          "II. Mortal Sin",
          "III. Mortal Sin"
        ],
        "requirements": {
          "1": {
            "accepted": [
              0,
              1,
              2
            ]
          },
          "2": {
            "accepted": [
              1,
              2
            ]
          },
          "3": {
            "accepted": [
              2
            ]
          }
        },
        "unknownOptions": [
          3
        ],
        "optionCount": 4,
        "gradation": [
          {
            "from": 1,
            "to": 1,
            "option": 0
          },
          {
            "from": 2,
            "to": 2,
            "option": 1
          },
          {
            "from": 3,
            "to": 3,
            "option": 2
          }
        ]
      },
      {
        "id": "mortal-fall-v4",
        "domain": "seriousSin",
        "sources": [
          "III. Mortal Sin"
        ],
        "requirements": {
          "3": {
            "accepted": [
              3
            ]
          }
        },
        "unknownOptions": [
          2
        ],
        "optionCount": 4
      },
      {
        "id": "mortal-response-v4",
        "domain": "seriousSin",
        "sources": [
          "I. Mortal Sin",
          "II. Mortal Sin",
          "III. Mortal Sin"
        ],
        "requirements": {
          "1": {
            "accepted": [
              1,
              2
            ],
            "exempt": [
              3
            ]
          },
          "2": {
            "accepted": [
              2
            ],
            "exempt": [
              3
            ]
          }
        },
        "exemptWhen": {
          "optionIndex": 3,
          "questionId": "mortal-fall-v4",
          "accepted": [
            3
          ],
          "bidirectional": true
        },
        "unknownOptions": [
          4
        ],
        "optionCount": 5
      },
      {
        "id": "venial-occurrence-v4",
        "domain": "venialSin",
        "sources": [
          "II. Venial Sin",
          "III. Venial Sin",
          "IV. Venial Sin"
        ],
        "requirements": {
          "3": {
            "accepted": [
              2,
              3,
              4
            ]
          },
          "4": {
            "accepted": [
              3,
              4
            ]
          }
        },
        "unknownOptions": [
          5
        ],
        "optionCount": 6
      },
      {
        "id": "venial-pattern-v6",
        "domain": "venialSin",
        "sources": [
          "I. Venial Sin",
          "II. Venial Sin",
          "III. Venial Sin",
          "IV. Venial Sin"
        ],
        "requirements": {
          "1": {
            "accepted": [
              0,
              1,
              2,
              3
            ]
          },
          "2": {
            "accepted": [
              1,
              2,
              3
            ]
          },
          "3": {
            "accepted": [
              2,
              3
            ]
          },
          "4": {
            "accepted": [
              3
            ]
          }
        },
        "unknownOptions": [
          4
        ],
        "optionCount": 5,
        "gradation": [
          {
            "from": 1,
            "to": 1,
            "option": 0
          },
          {
            "from": 2,
            "to": 2,
            "option": 1
          },
          {
            "from": 3,
            "to": 3,
            "option": 2
          },
          {
            "from": 4,
            "to": 4,
            "option": 3
          }
        ]
      },
      {
        "id": "venial-regret-v4",
        "domain": "venialSin",
        "sources": [
          "II. Venial Sin",
          "III. Venial Sin",
          "IV. Venial Sin"
        ],
        "requirements": {
          "2": {
            "accepted": [
              1,
              2
            ],
            "exempt": [
              3
            ]
          },
          "3": {
            "accepted": [
              2
            ],
            "exempt": [
              3
            ]
          }
        },
        "exemptWhen": {
          "optionIndex": 3,
          "questionId": "venial-occurrence-v4",
          "accepted": [
            4
          ],
          "bidirectional": true
        },
        "optionCount": 4
      },
      {
        "id": "venial-reparation-v4",
        "domain": "venialSin",
        "sources": [
          "III. Venial Sin",
          "IV. Venial Sin"
        ],
        "requirements": {
          "4": {
            "accepted": [
              2
            ],
            "exempt": [
              3
            ]
          }
        },
        "exemptWhen": {
          "optionIndex": 3,
          "questionId": "venial-occurrence-v4",
          "accepted": [
            4
          ],
          "bidirectional": true
        },
        "optionCount": 4
      },
      {
        "id": "imperfections-pattern-v6",
        "domain": "imperfections",
        "sources": [
          "III. Imperfections",
          "IV. Imperfections",
          "V. Imperfections",
          "VI. Imperfections"
        ],
        "requirements": {
          "3": {
            "accepted": [
              0,
              1,
              2,
              3
            ]
          },
          "4": {
            "accepted": [
              1,
              2,
              3
            ]
          },
          "5": {
            "accepted": [
              2,
              3
            ]
          },
          "6": {
            "accepted": [
              3
            ]
          }
        },
        "unknownOptions": [
          4
        ],
        "optionCount": 5,
        "gradation": [
          {
            "from": 3,
            "to": 3,
            "option": 0
          },
          {
            "from": 4,
            "to": 4,
            "option": 1
          },
          {
            "from": 5,
            "to": 5,
            "option": 2
          },
          {
            "from": 6,
            "to": 6,
            "option": 3
          }
        ]
      },
      {
        "id": "imperfections-virtue-v4",
        "domain": "imperfections",
        "sources": [
          "III. Imperfections",
          "IV. Imperfections"
        ],
        "requirements": {
          "4": {
            "accepted": [
              2
            ]
          }
        },
        "optionCount": 3
      },
      {
        "id": "imperfections-renunciation-v4",
        "domain": "imperfections",
        "sources": [
          "III. Imperfections",
          "IV. Imperfections"
        ],
        "requirements": {
          "4": {
            "accepted": [
              2
            ]
          }
        },
        "optionCount": 3
      },
      {
        "id": "imperfections-prompt-regret-v4",
        "domain": "imperfections",
        "sources": [
          "IV. Imperfections"
        ],
        "requirements": {
          "4": {
            "accepted": [
              2
            ],
            "exempt": [
              3
            ]
          }
        },
        "optionCount": 4
      },
      {
        "id": "suffering-endure-v4",
        "domain": "suffering",
        "sources": [
          "I. Suffering",
          "II. Suffering",
          "III. Suffering"
        ],
        "requirements": {
          "2": {
            "accepted": [
              1,
              2
            ]
          }
        },
        "unknownOptions": [
          3
        ],
        "optionCount": 4
      },
      {
        "id": "suffering-pattern-v6",
        "domain": "suffering",
        "sources": [
          "I. Suffering",
          "II. Suffering",
          "III. Suffering",
          "IV. Suffering",
          "V. Suffering",
          "VI. Suffering"
        ],
        "requirements": {
          "1": {
            "accepted": [
              0,
              1,
              2,
              3,
              4
            ]
          },
          "2": {
            "accepted": [
              1,
              2,
              3,
              4
            ]
          },
          "3": {
            "accepted": [
              2,
              3,
              4
            ]
          },
          "4": {
            "accepted": [
              3,
              4
            ]
          },
          "5": {
            "accepted": [
              4
            ]
          }
        },
        "unknownOptions": [
          5
        ],
        "optionCount": 6,
        "gradation": [
          {
            "from": 1,
            "to": 1,
            "option": 0
          },
          {
            "from": 2,
            "to": 2,
            "option": 1
          },
          {
            "from": 3,
            "to": 3,
            "option": 2
          },
          {
            "from": 4,
            "to": 4,
            "option": 3
          },
          {
            "from": 5,
            "to": 6,
            "option": 4
          }
        ]
      },
      {
        "id": "suffering-meaning-joy-v4",
        "domain": "suffering",
        "sources": [
          "IV. Suffering"
        ],
        "requirements": {
          "4": {
            "accepted": [
              2
            ]
          }
        },
        "unknownOptions": [
          3
        ],
        "optionCount": 4
      },
      {
        "id": "prayer-pattern-v6",
        "domain": "prayer",
        "sources": [
          "I. Prayer",
          "II. Prayer",
          "III. Prayer",
          "IV. Prayer",
          "V. Prayer",
          "VI. Prayer"
        ],
        "requirements": {
          "1": {
            "accepted": [
              1,
              2,
              3,
              4,
              5
            ]
          },
          "2": {
            "accepted": [
              2,
              3,
              4,
              5
            ]
          },
          "3": {
            "accepted": [
              3,
              4,
              5
            ]
          },
          "4": {
            "accepted": [
              4,
              5
            ]
          },
          "5": {
            "accepted": [
              5
            ]
          }
        },
        "unknownOptions": [
          6
        ],
        "optionCount": 7,
        "gradation": [
          {
            "from": 1,
            "to": 1,
            "option": 1
          },
          {
            "from": 2,
            "to": 2,
            "option": 2
          },
          {
            "from": 3,
            "to": 3,
            "option": 3
          },
          {
            "from": 4,
            "to": 4,
            "option": 4
          },
          {
            "from": 5,
            "to": 6,
            "option": 5
          }
        ]
      },
      {
        "id": "prayer-meditation-v4",
        "domain": "prayer",
        "sources": [
          "II. Prayer",
          "III. Prayer"
        ],
        "requirements": {
          "3": {
            "accepted": [
              2
            ]
          }
        },
        "optionCount": 3
      },
      {
        "id": "prayer-dryness-v4",
        "domain": "prayer",
        "sources": [
          "II. Prayer",
          "III. Prayer"
        ],
        "requirements": {
          "3": {
            "accepted": [
              2
            ],
            "exempt": [
              3
            ]
          }
        },
        "exemptWhen": {
          "optionIndex": 3,
          "questionId": "prayer-meditation-v4",
          "accepted": [
            2
          ]
        },
        "optionCount": 4
      },
      {
        "id": "prayer-prolong-v4",
        "domain": "prayer",
        "sources": [
          "IV. Prayer"
        ],
        "requirements": {
          "4": {
            "accepted": [
              2
            ]
          }
        },
        "optionCount": 3
      },
      {
        "id": "prayer-loving-response-v4",
        "domain": "prayer",
        "sources": [
          "III. Prayer",
          "IV. Prayer"
        ],
        "requirements": {
          "3": {
            "accepted": [
              2
            ]
          },
          "4": {
            "accepted": [
              2
            ]
          }
        },
        "optionCount": 3
      },
      {
        "id": "examen-pattern-v6",
        "domain": "examen",
        "sources": [
          "I. Examen",
          "II. Examen",
          "III. Examen",
          "IV. Examen",
          "IV. Imperfections"
        ],
        "requirements": {
          "1": {
            "accepted": [
              0,
              1,
              2,
              3
            ]
          },
          "2": {
            "accepted": [
              1,
              2,
              3
            ]
          },
          "3": {
            "accepted": [
              2,
              3
            ]
          },
          "4": {
            "accepted": [
              3
            ]
          }
        },
        "unknownOptions": [
          4
        ],
        "optionCount": 5,
        "gradation": [
          {
            "from": 1,
            "to": 1,
            "option": 0
          },
          {
            "from": 2,
            "to": 2,
            "option": 1
          },
          {
            "from": 3,
            "to": 3,
            "option": 2
          },
          {
            "from": 4,
            "to": 4,
            "option": 3
          }
        ]
      },
      {
        "id": "examen-method-v4",
        "domain": "examen",
        "sources": [
          "II. Venial Sin",
          "III. Venial Sin"
        ],
        "requirements": {
          "3": {
            "accepted": [
              2
            ]
          }
        },
        "optionCount": 3
      },
      {
        "id": "examen-particular-v4",
        "domain": "examen",
        "sources": [
          "III. Venial Sin",
          "IV. Imperfections"
        ],
        "requirements": {
          "3": {
            "accepted": [
              2,
              3
            ]
          },
          "4": {
            "accepted": [
              3
            ]
          }
        },
        "optionCount": 4
      },
      {
        "id": "sacraments-weekly-mass-v4",
        "domain": "sacraments",
        "sources": [
          "I. Sacraments",
          "II. Sacraments",
          "III. Sacraments",
          "IV. Sacraments"
        ],
        "requirements": {
          "1": {
            "accepted": [
              1,
              2
            ]
          },
          "2": {
            "accepted": [
              2
            ]
          }
        },
        "unknownOptions": [
          3
        ],
        "optionCount": 4
      },
      {
        "id": "sacraments-daily-mass-v4",
        "domain": "sacraments",
        "sources": [
          "III. Sacraments",
          "IV. Sacraments"
        ],
        "requirements": {
          "3": {
            "accepted": [
              2
            ],
            "exempt": [
              3
            ]
          }
        },
        "optionCount": 4
      },
      {
        "id": "sacraments-confession-schedule-v4",
        "domain": "sacraments",
        "sources": [
          "I. Sacraments",
          "II. Sacraments",
          "III. Sacraments",
          "IV. Sacraments"
        ],
        "requirements": {
          "1": {
            "accepted": [
              1,
              2,
              3,
              4
            ]
          },
          "2": {
            "accepted": [
              2,
              3,
              4
            ]
          },
          "3": {
            "accepted": [
              3,
              4
            ]
          },
          "4": {
            "accepted": [
              4
            ]
          }
        },
        "unknownOptions": [
          5
        ],
        "optionCount": 6
      },
      {
        "id": "sacraments-devotional-confession-v4",
        "domain": "sacraments",
        "sources": [
          "IV. Sacraments"
        ],
        "requirements": {
          "4": {
            "accepted": [
              2
            ]
          }
        },
        "unknownOptions": [
          3
        ],
        "optionCount": 4
      },
      {
        "id": "sacraments-pattern-v6",
        "domain": "sacraments",
        "sources": [
          "I. Sacraments",
          "II. Sacraments",
          "III. Sacraments",
          "IV. Sacraments"
        ],
        "requirements": {
          "1": {
            "accepted": [
              1,
              2,
              3,
              4
            ]
          },
          "2": {
            "accepted": [
              2,
              3,
              4
            ]
          },
          "3": {
            "accepted": [
              3,
              4
            ]
          },
          "4": {
            "accepted": [
              4
            ]
          }
        },
        "unknownOptions": [
          5
        ],
        "optionCount": 6,
        "gradation": [
          {
            "from": 1,
            "to": 1,
            "option": 1
          },
          {
            "from": 2,
            "to": 2,
            "option": 2
          },
          {
            "from": 3,
            "to": 3,
            "option": 3
          },
          {
            "from": 4,
            "to": 4,
            "option": 4
          }
        ]
      },
      {
        "id": "imperfections-consent-v5",
        "domain": "imperfections",
        "sources": [
          "V. Imperfections",
          "VI. Imperfections"
        ],
        "requirements": {
          "5": {
            "accepted": [
              2,
              3
            ]
          },
          "6": {
            "accepted": [
              3
            ]
          }
        },
        "unknownOptions": [
          4
        ],
        "optionCount": 5
      },
      {
        "id": "imperfections-loving-care-v5",
        "domain": "imperfections",
        "sources": [
          "V. Imperfections"
        ],
        "requirements": {
          "5": {
            "accepted": [
              2
            ]
          }
        },
        "optionCount": 3
      },
      {
        "id": "suffering-joyful-acceptance-v5",
        "domain": "suffering",
        "sources": [
          "V. Suffering",
          "VI. Suffering"
        ],
        "requirements": {
          "5": {
            "accepted": [
              2
            ]
          }
        },
        "unknownOptions": [
          3
        ],
        "optionCount": 4
      },
      {
        "id": "suffering-service-v5",
        "domain": "suffering",
        "sources": [
          "V. Suffering",
          "VI. Suffering"
        ],
        "requirements": {
          "5": {
            "accepted": [
              1,
              2
            ]
          },
          "6": {
            "accepted": [
              2
            ]
          }
        },
        "unknownOptions": [
          3
        ],
        "optionCount": 4
      },
      {
        "id": "prayer-daily-life-v5",
        "domain": "prayer",
        "sources": [
          "V. Prayer"
        ],
        "requirements": {
          "5": {
            "accepted": [
              2
            ]
          }
        },
        "optionCount": 3
      },
      {
        "id": "prayer-detachment-v5",
        "domain": "prayer",
        "sources": [
          "V. Prayer"
        ],
        "requirements": {
          "5": {
            "accepted": [
              2
            ]
          }
        },
        "optionCount": 3
      },
      {
        "id": "prayer-desire-v5",
        "domain": "prayer",
        "sources": [
          "V. Prayer"
        ],
        "requirements": {
          "5": {
            "accepted": [
              2
            ]
          }
        },
        "optionCount": 3
      },
      {
        "id": "prayer-self-forgetfulness-v5",
        "domain": "prayer",
        "sources": [
          "VI. Prayer"
        ],
        "requirements": {
          "6": {
            "accepted": [
              2
            ]
          }
        },
        "optionCount": 3
      }
    ]
  });
})();
