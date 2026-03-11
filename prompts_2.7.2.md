**Phase 2**
**Week 7**
**Class 2**

### Milestone 10 — Refactor QuestionCard
**Prompt**
How dos this buttonClass(index) work and how do we use it to return 'correct' on the correct answer and 'wrong' on the clicked wrong answer, only after selectedAnswer is not null. 

```JS
methods: {
        selectAnswer(index) {
            if (this.selectedAnswer !== null) return  // already answered, ignore
            this.$emit('answer', index)
        },
        buttonClass(index) {
            if (this.selectedAnswer === null) return ''
            if (index === this.question.correct) return 'correct'
            if (index === this.selectedAnswer) return 'wrong'
            return ''
        }
    }
```

### Milestone 11 — Refactor PlayView
No AI used.

### Milestone 12 — Update HomeView
**Prompt**
The play button no longer works at all. Why?

### Milestone 13 — Update the Navigation Guard
No AI used.

