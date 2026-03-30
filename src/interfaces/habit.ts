export interface CreateHabit {
    name: string;
    days: number[];
}

export interface Habit extends CreateHabit{
    id: number;
}

export interface HabitToday extends Habit{
    done: boolean;
    currentSequence: number;
    highestSequence: number;
}