export const MER_MULTIPLIERS = {
  dog: {
    puppy: 2.0,
    adult: {
      neutered: { sedentary: 1.4, moderate: 1.6, active: 1.8, 'very-active': 2.0 },
      intact: { sedentary: 1.6, moderate: 1.8, active: 2.0, 'very-active': 2.5 }
    },
    senior: { neutered: 1.2, intact: 1.4 }
  },
  cat: {
    kitten: 2.5,
    adult: {
      neutered: { sedentary: 1.2, moderate: 1.4, active: 1.6 },
      intact: { sedentary: 1.4, moderate: 1.6, active: 2.0 }
    },
    senior: { neutered: 1.1, intact: 1.2 }
  }
};

