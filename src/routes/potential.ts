function isInRange(num: number, min: number, max: number): boolean {
    return num >= min && num <= max;
}

function calculateScoreModifier(score: number): number {
    if (score >= 10_000_000) {return 2.0 }
    if (isInRange(score, 9_800_000, 9_999_999)) {
        return 1.0 + ( (score - 9_800_000 ) / (200_000) )
    }

    return ((score-9_500_000) / (300_000))
}

export function calculatePlayRating(chartConst: number, score: number):number {
    return Math.max(chartConst + calculateScoreModifier(score), 0)
}