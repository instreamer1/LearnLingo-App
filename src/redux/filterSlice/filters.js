export const applyFilters = (state) => {
    let teachers = [...state.allTeachers];
  
    if (state.language) {
      teachers = teachers.filter((teacher) =>
        teacher.languages.some(
          (lang) => lang.toLowerCase() === state.language.toLowerCase()
        )
      );
    }
  
    if (state.level) {
      teachers = teachers.filter((teacher) =>
        teacher.levels.some((lvl) => lvl.toLowerCase().startsWith(state.level.toLowerCase()))
      );
    }
  
    if (state.price) {
      teachers = teachers.filter((teacher) => teacher.price_per_hour >= state.price);
    }
  
    return teachers;
  };