const calculateAgeStats = (data: any[]) => {
  const ages: number[] = data
    .map((c) => {
      const birth = c.birthdate ? new Date(c.birthdate) : null
      if (!birth) return null
      const age = new Date().getFullYear() - birth.getFullYear()
      return age
    })
    .filter((a) => a !== null)

  const ageRanges = {
    '<25': 0,
    '25-34': 0,
    '35-44': 0,
    '45-54': 0,
    '55+': 0,
  }

  ages.forEach((age) => {
    if (age! < 25) ageRanges['<25']++
    else if (age! < 35) ageRanges['25-34']++
    else if (age! < 45) ageRanges['35-44']++
    else if (age! < 55) ageRanges['45-54']++
    else ageRanges['55+']++
  })

  return ageRanges
}
