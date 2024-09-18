import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Image,
  Loader2,
  Download,
  Share2,
  Trash2,
  RefreshCw,
  FolderKanban,
  History,
  Settings,
  LogOut,
} from "lucide-react";

export default function Dashboard() {
  return (
    <>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="generate">
            <Card>
              <CardHeader>
                <CardTitle>AI Interior Design Generator</CardTitle>
                <CardDescription>
                  Create stunning interior designs with AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="prompt" className="text-sm font-medium">
                      Design Prompt
                    </label>
                    <Input
                      id="prompt"
                      placeholder="Describe your interior design idea..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Number of Images
                    </label>
                    <Slider defaultValue={[4]} max={8} step={1} />
                    <div className="text-sm text-gray-500">4 images</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="enhance" />
                    <label htmlFor="enhance" className="text-sm font-medium">
                      Enhance with additional details
                    </label>
                  </div>
                  <Button className="w-full">Generate Images</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Project Management</CardTitle>
                <CardDescription>
                  Manage your interior design projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button>Create New Project</Button>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((project) => (
                      <Link href={`/project/${project}`} key={project}>
                        <Card>
                          <CardHeader>
                            <CardTitle>Project {project}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>Client: Client {project}</p>
                            <p>Status: In Progress</p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Generation History</CardTitle>
                <CardDescription>
                  View your past generated designs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <Card key={item}>
                      <CardHeader>
                        <CardTitle>Generated Design {item}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex items-center space-x-4">
                        <div className="w-24 h-24 bg-gray-200 flex items-center justify-center">
                          <Image className="h-8 w-8 text-gray-400" />
                        </div>
                        <div>
                          <p>Prompt: Modern living room with blue accents</p>
                          <p>Generated: {new Date().toLocaleString()}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
