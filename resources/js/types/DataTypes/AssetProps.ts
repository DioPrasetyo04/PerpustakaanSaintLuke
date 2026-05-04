export type TypeAssetResource = 'Asset-File' | 'Asset-Resources';
export type FileType = 'pdf' | 'video' | 'audio' | 'excel' | 'word' | 'image';
export type AssetProps = {
    id: number;
    type_resource: TypeAssetResource;
    file_type: FileType;
    url: string;
};
