import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Code2, Play, Eraser, Trash2, Upload, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const MainApp = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState("#3b82f6");
  const [penThickness, setPenThickness] = useState([3]);
  const [codeInput, setCodeInput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      ctx.beginPath();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing && e.type !== "click") return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = penThickness[0];
    ctx.lineCap = "round";
    ctx.strokeStyle = penColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && canvas) {
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    toast.success("Canvas cleared");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles((prev) => [...prev, ...files]);
    toast.success(`${files.length} file(s) uploaded`);
  };

  const handleRunCode = () => {
    setIsLoading(true);
    toast.info("Analyzing code...");
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Analysis complete! (Demo mode - AI features require API key)");
    }, 2000);
  };

  return (
    <div className="min-h-screen p-4 space-y-6">
      <div className="text-center space-y-2 py-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent pulse-glow">
          ✍️ Advanced AI Coder & Debugger 🧠
        </h1>
        <p className="text-muted-foreground">Analyze, debug, and execute code with AI assistance</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Canvas Section */}
        <Card className="card-elevated p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Draft Board</h2>
          </div>

          <canvas
            ref={canvasRef}
            className="w-full h-64 border border-border rounded-lg cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onMouseLeave={stopDrawing}
          />

          <div className="space-y-3">
            <div>
              <Label className="text-sm mb-2 block">Pen Color</Label>
              <div className="flex gap-2">
                {["#3b82f6", "#f59e0b", "#10b981", "#000000"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setPenColor(color)}
                    className={`w-10 h-10 rounded-lg border-2 transition-all ${
                      penColor === color ? "border-primary scale-110" : "border-border"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm mb-2 block">Thickness: {penThickness[0]}</Label>
              <Slider
                value={penThickness}
                onValueChange={setPenThickness}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setPenColor("#1e293b")} className="flex-1">
                <Eraser className="mr-2 h-4 w-4" />
                Eraser
              </Button>
              <Button variant="outline" onClick={clearCanvas} className="flex-1">
                <Trash2 className="mr-2 h-4 w-4" />
                Clear
              </Button>
            </div>
          </div>
        </Card>

        {/* Code Input Section */}
        <Card className="card-elevated p-6 space-y-4 lg:col-span-2">
          <h2 className="text-xl font-semibold">Code Input & Settings</h2>

          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <Label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-primary hover:underline">Click to upload</span> or drag and drop code images
              </Label>
              <Input
                id="file-upload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              {uploadedFiles.length > 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  {uploadedFiles.length} file(s) uploaded
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="code">Or paste your code here</Label>
              <Textarea
                id="code"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder="Paste your code here..."
                className="input-glow min-h-[200px] font-mono text-sm"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language" className="input-glow">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="c">C</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="csharp">C#</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button onClick={handleRunCode} disabled={isLoading} className="btn-hero">
                  {isLoading ? (
                    <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Play className="mr-2 h-5 w-5" />
                  )}
                  Analyze & Run
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Results Section */}
      <Card className="card-elevated p-6 space-y-4">
        <h2 className="text-xl font-semibold">AI Analysis & Execution Results</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm mb-2 block">Instructions on Mistakes</Label>
            <div className="bg-muted/30 rounded-lg p-4 min-h-[150px] font-mono text-sm">
              <p className="text-muted-foreground">AI feedback will appear here...</p>
            </div>
          </div>
          
          <div>
            <Label className="text-sm mb-2 block">AI Corrected Code</Label>
            <div className="bg-muted/30 rounded-lg p-4 min-h-[150px] font-mono text-sm">
              <p className="text-muted-foreground">Corrected code will appear here...</p>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-sm mb-2 block">Execution Output</Label>
          <div className="bg-muted/30 rounded-lg p-4 min-h-[100px] font-mono text-sm">
            <p className="text-muted-foreground">Output will appear here...</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
