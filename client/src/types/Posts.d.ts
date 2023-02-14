interface Ipost {
    _id: string
    title: string
    description: string
    image: string
    status: string
    user: Iuser
    category: 'accessory' | 'travel' | 'food'
    body: string
    createAt: string
}
