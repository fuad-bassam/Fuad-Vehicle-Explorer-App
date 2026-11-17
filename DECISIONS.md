# Decisions

## Assumptions
- Valid model years are 1981 to next year. Trying vPIC year by year showed model data starts at 1981, the first year of the 17-character VIN; earlier years come back empty.
- vPIC has no "get make by id" endpoint, so a single make is looked up in the cached full make list (about 12,400 makes).
- An unknown make id gives empty vehicle types and models from vPIC, and the API passes that through as an empty list.
