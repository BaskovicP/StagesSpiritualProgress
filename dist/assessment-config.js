(() => {
  "use strict";

  // Each required criterion is checked independently; options are not averaged.
  // Section references identify the supplied markdown, not validated cutoffs.
  // Later stage rules replace earlier rules for an item; other lower-stage criteria remain required.
  window.spiritualAssessment = Object.freeze({
    "questionnaireVersion": 4,
    "domainOrder": [
      "seriousSin",
      "venialSin",
      "imperfections",
      "suffering",
      "prayer",
      "examen",
      "sacraments"
    ],
    "highestAssessedStage": 4,
    "questionBlueprints": [
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
        "id": "mortal-resistance-v4",
        "domain": "seriousSin",
        "sources": [
          "I. Mortal Sin",
          "II. Mortal Sin"
        ],
        "requirements": {
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
          ]
        },
        "optionCount": 4
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
      "id": "venial-vigilance-v4",
        "domain": "venialSin",
        "sources": [
          "I. Venial Sin",
          "II. Venial Sin",
          "III. Venial Sin"
        ],
      "requirements": {
        "2": {
          "accepted": [1, 2]
        },
        "3": {
            "accepted": [
              2
            ]
          }
        },
        "optionCount": 3
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
          "accepted": [1, 2],
          "exempt": [3]
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
        "id": "imperfections-watch-v4",
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
        "id": "suffering-peace-v4",
        "domain": "suffering",
        "sources": [
          "I. Suffering",
          "II. Suffering",
          "III. Suffering"
        ],
        "requirements": {
          "3": {
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
      "id": "prayer-vocal-v4",
        "domain": "prayer",
      "sources": [
        "I. Prayer",
        "II. Prayer",
        "IV. Prayer"
      ],
        "requirements": {
          "1": {
          "accepted": [
            1,
            2,
            3
            ]
          },
          "2": {
          "accepted": [
            2,
            3
          ]
        },
        "4": {
          "accepted": [3]
        }
      },
      "optionCount": 4
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
          "accepted": [2]
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
        "id": "examen-frequency-v4",
        "domain": "examen",
        "sources": [
          "I. Examen",
          "II. Examen",
          "III. Examen",
          "IV. Examen"
        ],
        "requirements": {
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
        "optionCount": 4
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
        "id": "sacraments-fervent-participation-v4",
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
        "optionCount": 3
      }
    ]
  });
})();
