export const locationOptions: LocationOption[] = [
    {value: 'all', label: 'All Locations', isSelected: true},
    {value: 'valid', label: 'Valid Locations', isSelected: false},
    {value: 'invalid', label: 'Invalid Locations', isSelected: false}
]

export interface LocationOption {
    value: string
    label: string
    isSelected: boolean
}