interface IFormulary {
    id: number;
    name?: string;
    createdAt: Date;
    userId: number;
    status?: string;
    isNoted: boolean;
    isPrivate: boolean;
}

export default IFormulary;
