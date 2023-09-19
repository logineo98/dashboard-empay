import { regex, upload_files } from './constants'
import { ADMIN_TYPE, PARTNER_TYPE, TARIF_TYPE } from './types'

export const validation_admin = (props: ADMIN_TYPE, type: string, confirmEditPassword?: boolean) => {
    const { username, name, email, password } = props

    const initialError: ADMIN_TYPE = { username: '', name: '', email: '', password: '' }
    let error = initialError

    if (!username || username.trim() === '') {
        error = { ...error, username: 'Veuillez renseigner le champ.' }
    } else if (!regex.username.test(username)) {
        error = { ...error, username: 'Format non valide.' }
    } else if (username.length < 4) {
        error = { ...error, username: 'Doit être supérieur ou égal à 4 caractères.' }
    }

    if (!name || name.trim() === '') {
        error = { ...error, name: 'Veuillez renseigner le champ.' }
    }

    if (!email || email.trim() === '') {
        error = { ...error, email: 'Veuillez renseigner le champ.' }
    } else if (!regex.email.test(email)) {
        error = { ...error, email: 'Format d\'email incorrect.' }
    }

    if (type === 'add') {
        if (!password || password.trim() === '') {
            error = { ...error, password: 'Veuillez renseigner le champ.' }
        } else if (password.length < 6) {
            error = { ...error, password: 'Doit être supérieur ou égal à 6 caractères.' }
        }
    } else if (type === 'edit') {
        if (confirmEditPassword) {
            if (!password || password.trim() === '') {
                error = { ...error, password: 'Veuillez renseigner le champ.' }
            } else if (password.length < 6) {
                error = { ...error, password: 'Doit être supérieur ou égal à 6 caractères.' }
            }
        } else {
            if (password && password.length < 6) {
                error = { ...error, password: 'Doit être supérieur ou égal à 6 caractères.' }
            }
        }
    }

    return { error, initialError }
}

export const validation_partner = (props: PARTNER_TYPE) => {
    const { logo, name, description } = props

    const initialError: PARTNER_TYPE = { logo: '', name: '', description: '' }
    let error = initialError

    if (typeof logo === 'string') {
        if (!logo || logo.trim() === '') {
            error = { ...error, logo: 'Veuillez choisir un logo.' }
        }
    } else {
        if (!upload_files.FILES_ALLOW_TYPES.includes(logo.type)) {
            error = { ...error, logo: 'Seul les fichiers JPEG, PNG, JPG sont autorisés' }
        } else if (logo.size > upload_files.MAX_SIZE) {
            error = { ...error, logo: 'La taille du fichier ne doit pas depasser 1 Mo' }
        }
    }

    if (!name || name.trim() === '') {
        error = { ...error, name: 'Veuillez renseigner le champ.' }
    }

    if (!description || description.trim() === '') {
        error = { ...error, description: 'Veuillez renseigner le champ.' }
    }

    return { error, initialError }
}

export const validation_tarif = (props: TARIF_TYPE) => {
    const { tarif, description } = props

    const initialError: TARIF_TYPE = { tarif: '', description: '' }
    let error = initialError

    if (!tarif || tarif.trim() === '') error = { ...error, tarif: 'Veuillez renseigner le champ.' }
    if (!description || description.trim() === '') error = { ...error, description: 'Veuillez renseigner le champ.' }


    return { error, initialError }
}