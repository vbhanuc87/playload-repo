class MetaDto {
    // local properties (specific to DTO only)
    public isHot: boolean

    // Constructor Function
    constructor(
        public html_url: string,
        public clone_url: string,
        public forks: number,
        public full_name: string,
        public language: string,
    ) {
        this.isHot = forks > 500
    }

    
    public static parse(raw: MetaDto): MetaDto {
        /* If you need validation, do it here: */
        const cleanedData = MetaDto.validate(raw);
        return new MetaDto(null, null, null, null, null)
    }
    
    // Validation method (to validate any properties local to the Dto)
    public static validate(raw: MetaDto): MetaDto {
        return null;
    }

    public toModel(): MetaDto {
        // Convert DTO to Model
        return null;
    }

    public toString() {
        return `${this.full_name}, written in ${this.language}`
    }

    public toJson(): string {
        // Convert object to JSON
        return null;
    }

    public toXml(): string {
        // Convert object to XML
        return null;
    }

}