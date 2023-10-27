export const generateFileUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error("Aucune vidéo sélectionnée."));
            return;
        }

        if (!file.type.startsWith("video/")) {
            reject(new Error("Le fichier sélectionné n'est pas une vidéo."));
            return;
        }

        const reader = new FileReader();

        reader.onload = (event: ProgressEvent<FileReader>) => {
            const videoBlob = new Blob([(event.target?.result as any)], { type: file.type });
            const videoUrl = URL.createObjectURL(videoBlob);
            resolve(videoUrl);
        };

        reader.onerror = () => {
            reject(new Error("Erreur lors de la lecture de la vidéo."));
        };

        reader.readAsArrayBuffer(file);
    });

}
