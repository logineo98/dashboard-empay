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

export const displayDate = (date: number) => {
    const day = new Date(date).getDate() < 10 ? `0${new Date(date).getDate()}` : new Date(date).getDate()
    const month = new Date(date).getMonth() + 1 < 10 ? `0${new Date(date).getMonth() + 1}` : new Date(date).getMonth() + 1
    const year = new Date(date).getFullYear()
    const hour = new Date(date).getHours() < 10 ? `0${new Date(date).getHours()}` : new Date(date).getHours()
    const minute = new Date(date).getMinutes() < 10 ? `0${new Date(date).getMinutes()}` : new Date(date).getMinutes()

    return `${day}/${month}/${year} ${hour}:${minute}`
}