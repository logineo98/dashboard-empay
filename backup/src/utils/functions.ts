export const pass_next_or_return_prev = (e: React.ChangeEvent<HTMLInputElement>, next: string | null, current: string | null, prev: string | null) => {
    next && e.target.value.length === 1 && document.getElementById(next)?.focus()

    current && document.getElementById(current)?.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            if (!e.target.value) {
                event.preventDefault()
                prev && document.getElementById(prev)?.focus()
            }
        }
    })
}

export const light_or_dark_mode = () => {

}

export const isTokenExpired = (actual: number, final: number) => {
    if (final < actual) return true; else return false
}